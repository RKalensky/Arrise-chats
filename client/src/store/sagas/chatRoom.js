import { call, cancel, cancelled, fork, join, put, select, take } from 'redux-saga/effects';

import { EVENTS } from './constants';
import { fetchData } from '../../services/fetchData';
import { SELECT_ROOM } from '../actions/chatRooms';
import {
  addChatRoomMessage,
  fetchChatRoomMessagesError,
  fetchChatRoomMessagesStart,
  fetchChatRoomMessagesSuccess,
  RECONNECT,
  SEND_CHATROOM_MESSAGE,
  setChatRoomClosedStatus
} from '../actions/chatRoom';
import createWebsocketChannel from './events/wsEventsChannel';
import { getSelectedChatRoom } from '../selectors/chatRooms';

function* fetchChatRoomMessages(room, controller) {
  try {
    const data = yield call(fetchData, `/api/chat-rooms/${room}`, { signal: controller.signal });
    yield put(fetchChatRoomMessagesSuccess(data.messages));
  } catch (error) {
    yield put(fetchChatRoomMessagesError(error.message));
  }
}

function* wsSubscribeWorker(socketChannel) {
  while (true) {
    const action = yield take(socketChannel);

    switch (action.type) {
      case EVENTS.WS_ADD_MESSAGE:
        const currentRoom = yield select(getSelectedChatRoom);
        if (action.payload.roomId === currentRoom.id) {
          yield put(addChatRoomMessage({ ...action.payload, isFromSocket: true }));
        }
        break;

      case EVENTS.WS_CLOSED:
        yield put(setChatRoomClosedStatus(true));
        return;
    }
  }
}

function* wsNotifyWorker(socket) {
  while (true) {
    const action = yield take(SEND_CHATROOM_MESSAGE);
    socket.send(JSON.stringify(action.payload));
  }
}

function* chatRoomSocketsWorker() {
  let channel = null;
  let wsSubscriberTask = null;
  let wsNotifyTask = null;
  let socket = null;

  try {
    socket = new WebSocket(process.env.SOCKETS_BASE_URL);
    channel = yield call(createWebsocketChannel, socket);

    wsSubscriberTask = yield fork(wsSubscribeWorker, channel);
    wsNotifyTask = yield fork(wsNotifyWorker, socket);

    yield put(setChatRoomClosedStatus(false));
    yield join([wsSubscriberTask, wsNotifyTask]);
  } catch (error) {
    console.error(error);
  } finally {
    if (yield cancelled()) {
      channel?.close();
      yield cancel(wsSubscriberTask);
      yield cancel(wsNotifyTask);
    }
  }
}

function* reconnectWorker(chatTask) {
  let prevTask = chatTask;

  while (true) {
    yield take(RECONNECT);
    if (prevTask) {
      yield cancel(prevTask);
    }

    prevTask = yield fork(chatRoomSocketsWorker);
  }
}

export default function* chatRoom() {
  // In case of slow internet or fast actions, we abort the previous request to handle race conditions.
  let abortController = null;
  let chatTask = null;
  let reconnectWorkerTask = null;

  while (true) {
    const { payload: room } = yield take(SELECT_ROOM);

    if (chatTask) yield cancel(chatTask);
    if (reconnectWorkerTask) yield cancel(reconnectWorkerTask);

    if (abortController) abortController.abort();
    if (!room) continue;

    abortController = new AbortController();

    yield put(fetchChatRoomMessagesStart());
    yield fork(fetchChatRoomMessages, room.id, abortController);
    reconnectWorkerTask = yield fork(reconnectWorker, chatTask);
    chatTask = yield fork(chatRoomSocketsWorker);
  }
}

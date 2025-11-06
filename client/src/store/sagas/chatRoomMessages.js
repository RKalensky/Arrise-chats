import { call, cancel, cancelled, fork, join, put, take } from 'redux-saga/effects';

import { EVENTS } from './constants';
import { fetchData } from '../../services/fetchData';
import { SELECT_ROOM } from '../actions/chatRooms';
import {
  addChatRoomMessage,
  fetchChatRoomMessagesError,
  fetchChatRoomMessagesStart,
  fetchChatRoomMessagesSuccess,
  SEND_CHATROOM_MESSAGE
} from '../actions/chatRoomMessages';
import createWebsocketChannel from './actions/wsEventsChannel';

function* fetchChatRoomMessages(room, controller) {
  try {
    const data = yield call(fetchData, `/api/chat-rooms/${room}`, { signal: controller.signal });
    yield put(fetchChatRoomMessagesSuccess(data.messages));
  } catch (error) {
    yield put(fetchChatRoomMessagesError(error.message));
  }
}

function* wsSubscribeWorker(socketChannel) {
  try {
    while (true) {
      const action = yield take(socketChannel);

      switch (action.type) {
        case EVENTS.WS_ADD_MESSAGE:
          yield put(addChatRoomMessage({ ...action.payload, isFromSocket: true }));
          break;

        case EVENTS.WS_CLOSED:
        case EVENTS.WS_ERROR:
          // LOGIC
          return;
      }
    }
  } finally {
    console.log('[wsSubscribeWorker] stopped');
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

  try {
    const socket = new WebSocket(process.env.SOCKETS_BASE_URL);
    channel = yield call(createWebsocketChannel, socket);

    const wsSubscriberTask = yield fork(wsSubscribeWorker, channel);
    const wsNotifyTask = yield fork(wsNotifyWorker, socket);

    yield join(wsSubscriberTask);
    yield cancel(wsNotifyTask);
  } catch (error) {
    console.error(error);
  } finally {
    if (yield cancelled()) {
      channel?.close();
    }
  }
}

export default function* chatRoomMessages() {
  // In case of slow internet or fast actions, we abort the previous request to handle race conditions.
  let abortController = null;
  let chatTask = null;

  while (true) {
    const { payload: room } = yield take(SELECT_ROOM);

    if (!room) continue;
    if (abortController) abortController.abort();
    if (chatTask) yield cancel(chatTask);

    abortController = new AbortController();

    yield put(fetchChatRoomMessagesStart());
    yield fork(fetchChatRoomMessages, room.id, abortController);
    chatTask = yield fork(chatRoomSocketsWorker, room);
  }
}

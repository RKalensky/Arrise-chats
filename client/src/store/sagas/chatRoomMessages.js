import { call, cancel, cancelled, fork, join, put, select, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { EVENTS } from './constants';
import { fetchData } from '../../services/fetchData';
import { SELECT_ROOM } from '../actions/chatRoomsList';
import { getSelectedChatRoom } from '../selectors/chatRoomsList';
import {
  addChatRoomMessage,
  fetchChatRoomMessagesError,
  fetchChatRoomMessagesStart,
  fetchChatRoomMessagesSuccess,
  SEND_CHATROOM_MESSAGE
} from '../actions/chatRoomMessages';

function* fetchChatRoomMessages(room, controller) {
  try {
    const data = yield call(fetchData, `/api/chat-rooms/${room}`, { signal: controller.signal });
    yield put(fetchChatRoomMessagesSuccess(data.messages));
  } catch (error) {
    yield put(fetchChatRoomMessagesError(error.message));
  }
}

function createWebsocketChannel(socket) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      console.log('WebSocket open');
      emit({ type: EVENTS.WS_CONNECTED });
    };
    socket.onerror = (error) => {
      console.error('WebSocket error ' + error);
    };
    socket.onclose = () => {
      emit({ type: EVENTS.WS_CLOSED });
    };
    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        return emit({ type: EVENTS.WS_ADD_MESSAGE, payload });
      } catch (error) {
        console.error('WebSocket message error', error);
      }
    };

    return () => {
      console.log('UNS');
      socket.close();
    };
  });
}

function* wsSubscribeWorker(channel) {
  while (true) {
    const action = yield take(channel);

    if (action.type === EVENTS.WS_ADD_MESSAGE) {
      yield put(addChatRoomMessage({ ...action.payload, isFromSocket: true }));
    }

    if (action.type === EVENTS.WS_CLOSED) {
      return EVENTS.WS_CLOSED;
    }
  }
}

function* wsNotifyWorker(socket) {
  while (true) {
    const action = yield take(SEND_CHATROOM_MESSAGE);
    socket.send(JSON.stringify(action.payload));
  }
}

function* chatRoomMessagesWorker() {
  let channel = null;

  try {
    const socket = new WebSocket(process.env.SOCKETS_BASE_URL);
    channel = yield call(createWebsocketChannel, socket);

    const wsSubscriberTask = yield fork(wsSubscribeWorker, channel);
    const wsNotifyTask = yield fork(wsNotifyWorker, socket);

    yield join(wsSubscriberTask);
    yield cancel(wsNotifyTask);
  } finally {
    if (yield cancelled()) {
      channel?.close();
    }
  }
}

export default function* chatRoomMessages() {
  let chatTask = null;
  let isReconnect = false;

  // In case of slow internet or fast actions, we abort the previous request to handle race conditions.
  let abortController = null;

  while (true) {
    yield take(SELECT_ROOM);
    const room = yield select(getSelectedChatRoom);

    if (abortController) {
      abortController.abort();
    }

    if (chatTask) {
      yield cancel(chatTask);
    }

    if (!room) {
      continue;
    }

    if (!isReconnect) {
      abortController = new AbortController();
      yield put(fetchChatRoomMessagesStart());
      yield fork(fetchChatRoomMessages, room.id, abortController);
    }

    chatTask = yield fork(chatRoomMessagesWorker, room);
    isReconnect = false;
  }
}

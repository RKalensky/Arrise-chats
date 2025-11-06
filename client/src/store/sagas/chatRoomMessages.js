import { call, cancelled, fork, put, select, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { SELECT_ROOM } from '../actions/chatRoomsList';
import { getSelectedChatRoom } from '../selectors/chatRoomsList';
import { fetchData } from '../../services/fetchData';
import {
  addChatRoomMessage,
  fetchChatRoomMessagesError,
  fetchChatRoomMessagesStart,
  fetchChatRoomMessagesSuccess,
  SEND_CHATROOM_MESSAGE
} from '../actions/chatRoomMessages';

const ADD_MESSAGE = 'ADD_MESSAGE';

function* fetchChatRoomMessages(room) {
  try {
    const data = yield call(fetchData, `/api/chat-rooms/${room}`);
    yield put(fetchChatRoomMessagesSuccess(data.messages));
  } catch (error) {
    yield put(fetchChatRoomMessagesError(error.message));
  }
}

function createWebSocketConnection() {
  return new WebSocket(process.env.SOCKETS_BASE_URL);
}

function createWebsocketChannel(socket) {
  return eventChannel((emit) => {
    socket.onopen = () => {};
    socket.onerror = (error) => {
      console.log('WebSocket error ' + error);
    };
    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        return emit({ type: 'ADD_MESSAGE', payload });
      } catch (error) {
        console.error('WebSocket message error', error);
      }
    };

    return () => {
      socket.close();
    };
  });
}

function* wsSubscribeWorker(channel) {
  try {
    while (true) {
      const action = yield take(channel);

      switch (action.type) {
        case ADD_MESSAGE: {
          yield put(addChatRoomMessage({ ...action.payload, isFromSocket: true }));
        }
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
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
  const socket = yield call(createWebSocketConnection);
  const channel = yield call(createWebsocketChannel, socket);
  window.chatS = socket;

  yield fork(wsSubscribeWorker, channel);
  yield fork(wsNotifyWorker, socket);
}

export default function* chatRoomMessages() {
  let task = null;

  while (true) {
    yield take(SELECT_ROOM);
    const room = yield select(getSelectedChatRoom);

    if (task) {
      task.cancel();
    }

    if (!room) {
      continue;
    }

    yield put(fetchChatRoomMessagesStart());
    yield call(fetchChatRoomMessages, room.id);

    task = yield fork(chatRoomMessagesWorker, room);
  }
}

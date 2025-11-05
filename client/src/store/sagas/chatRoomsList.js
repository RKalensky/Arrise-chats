import { call, put, take } from 'redux-saga/effects';
import {
  FETCH_CHAT_ROOMS_ERROR,
  FETCH_CHAT_ROOMS_START,
  FETCH_CHAT_ROOMS_SUCCESS
} from '../actions/chatRoomsList';
import { fetchData } from '../../services/fetchData';

function* fetchChatRooms() {
  try {
    const data = yield call(fetchData, '/api/chat-rooms');
    yield put({ type: FETCH_CHAT_ROOMS_SUCCESS, payload: data.rooms });
  } catch (error) {
    yield put({ type: FETCH_CHAT_ROOMS_ERROR, payload: error.message });
  }
}

export default function* chatRoomsListSaga() {
  while (true) {
    yield take(FETCH_CHAT_ROOMS_START);
    yield call(fetchChatRooms);
  }
}

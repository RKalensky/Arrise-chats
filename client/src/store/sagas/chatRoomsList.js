import { call, put } from 'redux-saga/effects';
import {
  fetchChatRoomsError,
  fetchChatRoomsStart,
  fetchChatRoomsSuccess
} from '../actions/chatRoomsList';
import { fetchData } from '../../services/fetchData';

function* fetchChatRooms() {
  try {
    const data = yield call(fetchData, '/api/chat-rooms');
    yield put(fetchChatRoomsSuccess(data.rooms));
  } catch (error) {
    yield put(fetchChatRoomsError(error.message));
  }
}

export default function* chatRoomsListSaga() {
  yield put(fetchChatRoomsStart());
  yield call(fetchChatRooms);
}

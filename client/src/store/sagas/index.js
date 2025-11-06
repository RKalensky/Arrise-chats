import { fork } from 'redux-saga/effects';
import chatRoomsSaga from './chatRooms';
import chatRoomMessages from './chatRoomMessages';

export default function* rootSaga() {
  yield fork(chatRoomsSaga);
  yield fork(chatRoomMessages);
}

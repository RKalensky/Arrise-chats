import { fork } from 'redux-saga/effects';
import chatRoomsSaga from './chatRooms';
import chatRoom from './chatRoom';

export default function* rootSaga() {
  yield fork(chatRoomsSaga);
  yield fork(chatRoom);
}

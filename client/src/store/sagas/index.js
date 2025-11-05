import { all, fork } from 'redux-saga/effects';
import chatRoomsListSaga from './chatRoomsList';
import chatRoomMessages from './chatRoomMessages';

export default function* mySaga() {
  yield all([fork(chatRoomsListSaga), fork(chatRoomMessages)]);
}

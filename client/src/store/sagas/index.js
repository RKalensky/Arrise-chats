import { all, fork } from 'redux-saga/effects';
import chatRoomsListSaga from './chatRoomsList';

export default function* mySaga() {
  yield all([fork(chatRoomsListSaga)]);
}

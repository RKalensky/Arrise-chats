import { produce } from 'immer';
import {
  FETCH_CHAT_ROOMS_ERROR,
  FETCH_CHAT_ROOMS_START,
  FETCH_CHAT_ROOMS_SUCCESS,
  SELECT_ROOM
} from '../actions/chatRoomsList';

const INITIAL_STATE = {
  rooms: [],
  isFetching: false,
  errorMessage: '',
  selectedRoom: null
};

const chatRoomsListReducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_CHAT_ROOMS_START:
      draft.rooms = [];
      draft.errorMessage = '';
      draft.selectedRoom = null;
      draft.isFetching = true;
      break;
    case FETCH_CHAT_ROOMS_SUCCESS:
      draft.isFetching = false;
      draft.rooms = action.payload;
      break;
    case FETCH_CHAT_ROOMS_ERROR:
      draft.isFetching = false;
      draft.errorMessage = action.payload;
      break;
    case SELECT_ROOM:
      draft.selectedRoom = action.payload;
      break;
    default:
      break;
  }
}, INITIAL_STATE);

export default chatRoomsListReducer;

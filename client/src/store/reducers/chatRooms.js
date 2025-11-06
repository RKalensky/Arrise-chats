import { produce } from 'immer';
import {
  FETCH_CHAT_ROOMS_ERROR,
  FETCH_CHAT_ROOMS_START,
  FETCH_CHAT_ROOMS_SUCCESS,
  SELECT_ROOM
} from '../actions/chatRooms';

const INITIAL_STATE = {
  rooms: [],
  isFetching: false,
  errorMessage: '',
  selectedRoom: null
};

const chatRoomsReducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_CHAT_ROOMS_START:
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

export default chatRoomsReducer;

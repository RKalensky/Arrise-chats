import { produce } from 'immer';
import {
  ADD_CHATROOM_MESSAGE,
  FETCH_CHATROOM_MESSAGES_ERROR,
  FETCH_CHATROOM_MESSAGES_START,
  FETCH_CHATROOM_MESSAGES_SUCCESS
} from '../actions/chatRoomMessages';

const INITIAL_STATE = {
  messages: [],
  isFetching: false,
  fetchErrorMessage: ''
};

const chatRoomMessagesReducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_CHATROOM_MESSAGES_START:
      draft.messages = [];
      draft.fetchErrorMessage = '';
      draft.isFetching = true;
      break;

    case FETCH_CHATROOM_MESSAGES_SUCCESS:
      draft.isFetching = false;
      draft.messages = action.payload;
      break;

    case FETCH_CHATROOM_MESSAGES_ERROR:
      draft.isFetching = false;
      draft.fetchErrorMessage = action.payload;
      break;

    case ADD_CHATROOM_MESSAGE:
      draft.messages.push(action.payload);
      break;

    default:
      break;
  }
}, INITIAL_STATE);

export default chatRoomMessagesReducer;

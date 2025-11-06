export const FETCH_CHATROOM_MESSAGES_START = 'FETCH_CHATROOM_MESSAGES_START';
export const FETCH_CHATROOM_MESSAGES_SUCCESS = 'FETCH_CHATROOM_MESSAGES_SUCCESS';
export const FETCH_CHATROOM_MESSAGES_ERROR = 'FETCH_CHATROOM_MESSAGES_ERROR';

export const SEND_CHATROOM_MESSAGE = 'SEND_CHATROOM_MESSAGE';
export const ADD_CHATROOM_MESSAGE = 'ADD_CHATROOM_MESSAGE';
export const SET_CLOSED_STATUS = 'SET_CLOSED_STATUS';
export const RECONNECT = 'RECONNECT';

export const fetchChatRoomMessagesStart = () => ({
  type: FETCH_CHATROOM_MESSAGES_START
});

export const fetchChatRoomMessagesError = (payload) => ({
  type: FETCH_CHATROOM_MESSAGES_ERROR,
  payload
});

export const fetchChatRoomMessagesSuccess = (payload) => ({
  type: FETCH_CHATROOM_MESSAGES_SUCCESS,
  payload
});

export const sendChatRoomMessage = (payload) => ({
  type: SEND_CHATROOM_MESSAGE,
  payload
});

export const addChatRoomMessage = (payload) => ({
  type: ADD_CHATROOM_MESSAGE,
  payload
});

export const setChatRoomClosedStatus = (payload) => {
  console.log('setChatRoomClosedStatus', payload);

  return {
    type: SET_CLOSED_STATUS,
    payload
  };
};

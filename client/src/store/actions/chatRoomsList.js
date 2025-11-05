export const FETCH_CHAT_ROOMS_START = 'FETCH_CHAT_ROOMS_START';
export const FETCH_CHAT_ROOMS_SUCCESS = 'FETCH_CHAT_ROOMS_SUCCESS';
export const FETCH_CHAT_ROOMS_ERROR = 'FETCH_CHAT_ROOMS_ERROR';

export const fetchChatRoomsStart = () => ({
  type: FETCH_CHAT_ROOMS_START
});

export const fetchChatRoomsError = (payload) => ({
  type: FETCH_CHAT_ROOMS_SUCCESS,
  payload
});

export const fetchChatRoomsSuccess = (payload) => ({
  type: FETCH_CHAT_ROOMS_ERROR,
  payload
});

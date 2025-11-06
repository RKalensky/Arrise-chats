import { END, eventChannel } from 'redux-saga';
import { EVENTS } from '../constants';

export default function createWebsocketChannel(socket) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      console.log('WebSocket open');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error ' + error);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
      emit({ type: EVENTS.WS_CLOSED });
      emit(END);
    };

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        emit({ type: EVENTS.WS_ADD_MESSAGE, payload });
      } catch (error) {
        console.error('WebSocket message error', error);
      }
    };

    return () => {
      console.log('UNS');
      socket.close();
    };
  });
}

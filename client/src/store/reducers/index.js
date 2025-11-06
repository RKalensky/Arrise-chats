import { combineReducers } from 'redux';
import ui from './ui';
import chatRooms from './chatRooms';
import chatRoomMessages from './chatRoomMessages';

export default combineReducers({ ui, chatRooms, chatRoomMessages });

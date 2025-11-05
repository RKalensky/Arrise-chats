import { combineReducers } from 'redux';
import ui from './ui';
import chatRoomsList from './chatRoomsList';
import chatRoomMessages from './chatRoomMessages';

export default combineReducers({ ui, chatRoomsList, chatRoomMessages });

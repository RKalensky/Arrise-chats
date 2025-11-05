import { combineReducers } from 'redux';
import ui from './ui';
import chatRoomsList from './chatRoomsList';

export default combineReducers({ ui, chatRoomsList });

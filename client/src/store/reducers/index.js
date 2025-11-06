import { combineReducers } from 'redux';
import ui from './ui';
import chatRooms from './chatRooms';
import chatRoom from './chatRoom';

export default combineReducers({ ui, chatRooms, chatRoom });

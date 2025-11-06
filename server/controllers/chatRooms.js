import ChatRoomsManager from '../chatRooms/chatRoomsManager.js';
import { NOT_FOUND_STATUS_CODE, SUCCESS_STATUS_CODE } from '../constants/statusCodes.js';

export function getChatRooms(req, res) {
    res.status(SUCCESS_STATUS_CODE).json({
        rooms: ChatRoomsManager.getAllChatRooms()
    });
}

export function getChatRoomMessages(req, res) {
    const room = ChatRoomsManager.getChatRoom(req.params.id);

    if (!room) {
        return res.status(NOT_FOUND_STATUS_CODE).json({
            message: 'Room not found'
        });
    }

    res.status(SUCCESS_STATUS_CODE).json({
        id: room.id,
        name: room.name,
        messages: room.getLatestMessages()
    });
}
import ChatRoom from './chatRoom.js';
import { INITIAL_CHAT_ROOMS_COUNT } from '../constants/chatRooms.js';

export default class ChatRoomsManager {
    static chatRooms = new Map();

    static createChatRoom({ id, name }) {
        const chatRoom = new ChatRoom({ id, name });
        this.chatRooms.set(id, chatRoom);
    }

    static getAllChatRooms() {
        /* Return only { id, name } fields */
        return [...this.chatRooms.values()].map(({ messages, ...rest }) => rest);
    }

    static getChatRoom(id) {
        return this.chatRooms.get(id);
    }

    static initChatRooms() {
        Array.from({ length: INITIAL_CHAT_ROOMS_COUNT }).forEach((_, index) => {
            this.createChatRoom({
                id: `${index + 1}`,
                name: `room-${index + 1}`
            })
        })
    }
}
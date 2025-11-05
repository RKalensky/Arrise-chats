import { MAX_LATEST_MESSAGES_COUNT } from '../constants/chatRooms.js';

export default class ChatRoom {
    constructor({ id, name }) {
        this.id = id;
        this.name = name;
        this.messages = [];
    }

    addMessage({ userName, message }) {
        this.messages.push({ userName, message });
    }

    getLatestMessages() {
        return this.messages.slice(MAX_LATEST_MESSAGES_COUNT * -1);
    }
}
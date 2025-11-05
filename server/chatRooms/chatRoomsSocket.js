import ChatRoomsManager from './chatRoomsManager.js';
import { WebSocketServer } from 'ws';
import { MESSAGE_MAX_LENGTH } from '../constants/chatRooms.js';

const initListeners = (wsServer, ws) => {
    ws.on('message', (rawData) => {
        try {
            const data = JSON.parse(rawData);
            const { roomId, userName, message } = data;
            const room = ChatRoomsManager.getChatRoom(roomId);

            if (!roomId || !userName || !message) {
                return;
            }

            if (message.length > MESSAGE_MAX_LENGTH) {
                return;
            }

            if (!room) {
                return;
            }

            // TODO: check emojis
            room.addMessage({ userName, message });
            notifyAll(wsServer, data);
        } catch (error) {
            console.error(error);
        }
    });
}

const notifyAll = (wsServer, data) => {
    wsServer.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

export default function initChatRoomsSocket(http) {
    const wsServer = new WebSocketServer({ server: http });

    wsServer.on('connection', (ws) => {
        initListeners(wsServer, ws);
    });
}
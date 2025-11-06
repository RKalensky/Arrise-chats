import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import ChatRoomsManager from './chatRoomsManager.js';
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

            const messageId = uuidv4();
            room.addMessage({ userName, message, id: messageId });
            notifyAll(wsServer, { ...data, id: messageId });
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

        setInterval(() => {
            ws.close(4000, 'Simulated disconnect');
        }, 5000);
    });
}
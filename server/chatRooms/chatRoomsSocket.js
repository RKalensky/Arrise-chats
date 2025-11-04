import ChatRoomsManager from './chatRoomsManager.js';
import { WebSocketServer } from 'ws';
import { MESSAGE_MAX_LENGTH } from '../constants/chatRooms.js';

const initListeners = (wsServer, ws) => {
    ws.on('message', (rawData) => {
        try {
            const data = JSON.parse(rawData);
            const { roomId, userId, userName, message } = data;
            const room = ChatRoomsManager.getChatRoom(roomId);

            // TODO: check emojis
            if (message.length > MESSAGE_MAX_LENGTH) {
                return ws.send(JSON.stringify({ error: `Message length is exceeded ${MESSAGE_MAX_LENGTH} characters` }));
            }

            if (!room) {
                return ws.send(JSON.stringify({ error: 'Room not found' }));
            }

            room.addMessage({ userId, userName, message });
            notifyAll(wsServer, data);
        } catch (error) {
            ws.send(JSON.stringify({ error: error.message }))
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
import { createServer } from 'http';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import chatRoomsRouter from './routes/chatRooms.js';
import initChatRoomsSocket from './chatRooms/chatRoomsSocket.js';
import ChatRoomsManager from './chatRooms/chatRoomsManager.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());

app.use('/api/chat-rooms', chatRoomsRouter);
app.use(notFound);
app.use(errorHandler);

const httpServer = createServer(app);

httpServer.listen(port, () => {
    ChatRoomsManager.initChatRooms();
    initChatRoomsSocket(httpServer);
});
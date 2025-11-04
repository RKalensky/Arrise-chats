import { Router } from 'express';
import { getChatRoomMessages, getChatRooms } from '../controllers/chatRooms.js';

const router = Router();

router.get('/', getChatRooms);
router.get('/:id', getChatRoomMessages);

export default router;
import { Router } from 'express';
import StartConversationController from '../controllers/StartConversationController';

const router = Router();

const startConversationController = new StartConversationController();

router.post('/startConversation', startConversationController.handle);

export default router;

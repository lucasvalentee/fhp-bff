import { Router } from 'express';
import ProcessMessageController from '../controllers/ProcessMessageController';
import StartConversationController from '../controllers/StartConversationController';

const router = Router();

const startConversationController = new StartConversationController();

const processMessageController = new ProcessMessageController();

router.post('/startConversation', startConversationController.handle);

router.post('/processMessage', processMessageController.handle);

export default router;

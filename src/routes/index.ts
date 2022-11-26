import { Router } from 'express';
import ProcessMessageController from '../controllers/ProcessMessageController';
import ProcessRegionController from '../controllers/ProcessRegionController';
import StartConversationController from '../controllers/StartConversationController';

const router = Router();

const startConversationController = new StartConversationController();

const processMessageController = new ProcessMessageController();

const processRegionController = new ProcessRegionController();

router.post('/startConversation', startConversationController.handle);

router.post('/processMessage', processMessageController.handle);

router.post('/processRegion', processRegionController.handle);

export default router;

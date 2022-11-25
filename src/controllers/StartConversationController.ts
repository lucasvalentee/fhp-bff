import { Request, Response } from 'express';
import StartConversationService from '../services/StartConversationService';

class StartConversationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const botResponse = await StartConversationService.execute();

    return response.status(200).json(botResponse);
  }
}

export default StartConversationController;

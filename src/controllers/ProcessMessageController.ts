import { Request, Response } from 'express';
import ProcessMessageService from '../services/ProcessMessageService';

class ProcessMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { message } = request.body;

    const botResponse = await ProcessMessageService.execute(message);

    return response.status(200).json(botResponse);
  }
}

export default ProcessMessageController;

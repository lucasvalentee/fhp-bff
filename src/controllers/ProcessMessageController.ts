import { Request, Response } from 'express';
import RegionModel from '../models/RegionModel';
import ProcessMessageService from '../services/ProcessMessageService';
import SearchProfessionalsService from '../services/SearchProfessionalsService';

class ProcessMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { message } = request.body;

    let botResponse = await ProcessMessageService.execute(message);

    if (botResponse.intent.startsWith('profissional')) {
      botResponse = await SearchProfessionalsService.process(botResponse);
    }

    return response.status(200).json(botResponse);
  }
}

export default ProcessMessageController;

import { Request, Response } from 'express';
import RegionModel from '../models/RegionModel';
import ProcessMessageService from '../services/ProcessMessageService';

class ProcessMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { message } = request.body;

    let botResponse = await ProcessMessageService.execute(message);

    if (
      botResponse.intent.startsWith('profissional') &&
      !RegionModel.getInstance().isRegionFilled()
    ) {
      botResponse = await ProcessMessageService.execute(
        'solicitacao.informar_regiao',
      );
    }

    return response.status(200).json(botResponse);
  }
}

export default ProcessMessageController;

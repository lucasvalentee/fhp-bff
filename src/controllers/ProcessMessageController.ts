import { Request, Response } from 'express';
import ProcessMessageService from '../services/ProcessMessageService';
import SearchProfessionalsService from '../services/SearchProfessionalsService';

class ProcessMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { message } = request.body;

    let botResponse = await ProcessMessageService.execute(message);

    if (
      botResponse.lastIntent ===
        'solicitacao.buscar_profissional.area_medica' &&
      botResponse.intent === 'naoentendi'
    ) {
      botResponse = {
        answer:
          'Desculpe, não existem profissionais cadastrados para essa especialidade. Você pode tentar novamente buscando por outra especialidade.',
        intent: 'solicitacao.nao_existe_especialidade',
        lastIntent: 'solicitacao.buscar_profissional.area_medica',
        options: ['showRegionInputs'],
      };
    } else if (botResponse.intent.startsWith('profissional')) {
      botResponse = await SearchProfessionalsService.process(botResponse);
    }

    return response.status(200).json(botResponse);
  }
}

export default ProcessMessageController;

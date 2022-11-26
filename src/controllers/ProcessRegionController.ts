import { Request, Response } from 'express';
import RegionModel from '../models/RegionModel';
import ProcessMessageService from '../services/ProcessMessageService';

class ProcessRegionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryStateId, cityId } = request.body;

    RegionModel.getInstance().setData({ countryStateId, cityId });

    const botResponse = await ProcessMessageService.execute(
      'solicitacao.buscar_profissional.area_medica',
    );

    return response.status(200).json(botResponse);
  }
}

export default ProcessRegionController;

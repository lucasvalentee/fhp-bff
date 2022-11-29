import axios from 'axios';
import BotResponse from '../interfaces/BotResponse';
import RegionModel from '../models/RegionModel';
import Specialty from '../interfaces/Specialty';
import ProcessMessageService from './ProcessMessageService';
import CardData from '../interfaces/CardData';
import StaticPaymentMethods from '../interfaces/StaticPaymentMethods';

class SearchProfessionalsService {
  static async process(currentBotResponse: BotResponse): Promise<BotResponse> {
    try {
      const { BACKEND_URL } = process.env;

      if (!BACKEND_URL) {
        throw new Error('Error on search professionals');
      }

      if (!RegionModel.getInstance().isRegionFilled()) {
        return await ProcessMessageService.execute(
          'solicitacao.informar_regiao',
        );
      }

      const specialtyName = currentBotResponse.intent.substring(13);

      const specialtyResponse = await axios.get<Specialty>(
        `${BACKEND_URL}/specialties/findByName/${specialtyName}`,
      );

      console.log(specialtyResponse.data);

      if (!specialtyResponse.data) {
        return {
          answer:
            'Desculpe, não existem profissionais cadastrados para essa especialidade. Você pode tentar novamente buscando por outra especialidade.',
          intent: 'solicitacao.nao_existe_especialidade',
          lastIntent: currentBotResponse.lastIntent,
          options: ['showRegionInputs'],
        };
      }

      const specialty = specialtyResponse.data;

      const serviceLocationsResponse = await axios.get(
        `${BACKEND_URL}/serviceLocations/findByRegionAndSpecialty/${RegionModel.getInstance().getCountryStateId()}/${RegionModel.getInstance().getCityId()}/${
          specialty.id
        }`,
      );

      if (
        !serviceLocationsResponse.data ||
        !serviceLocationsResponse.data?.length
      ) {
        return {
          answer:
            'Desculpe, não existem profissionais cadastrados para essa especialidade na região desejada. Por favor, tente novamente:',
          intent: 'solicitacao.nao_encontrou_tente_novamente',
          lastIntent: currentBotResponse.lastIntent,
          options: ['showRegionInputs'],
        };
      }

      const serviceLocations = serviceLocationsResponse.data;

      return SearchProfessionalsService.formatProfessionalData(
        currentBotResponse,
        serviceLocations,
        specialty.id,
      );
    } catch (error: Error | any) {
      console.log('[SearchProfessionalsService.process] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }

  static formatProfessionalData(
    botResponse: BotResponse,
    serviceLocations: any,
    specialtyId: string,
  ): BotResponse {
    const cardData = serviceLocations.map((serviceLocation: any) => {
      const professionalSpecialtyServiceLocationFound =
        serviceLocation.professionalSpecialtyServiceLocation.find(
          (professionalSpecialtyServiceLocation: any) =>
            professionalSpecialtyServiceLocation.specialtyId === specialtyId,
        );

      const professionalName =
        professionalSpecialtyServiceLocationFound.person.name;

      const paymentMethods = serviceLocation.paymentMethods
        .map((paymentMethod: number) =>
          StaticPaymentMethods.find(item => item.id === paymentMethod),
        )
        .map((staticPaymentMethod: any) => staticPaymentMethod.description);

      return {
        professionalName,
        countryState: serviceLocation.countryState.name,
        city: serviceLocation.city.name,
        address: serviceLocation.address,
        district: serviceLocation.district,
        zipCode: serviceLocation.zipCode,
        phoneNumber: serviceLocation.phoneNumber,
        medicalInsurance: serviceLocation.medicalInsurance,
        paymentMethods: paymentMethods.join(', '),
        complement: serviceLocation.complement,
      } as CardData;
    });

    return {
      ...botResponse,
      cardData,
    };
  }
}

export default SearchProfessionalsService;

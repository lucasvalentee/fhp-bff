import axios from 'axios';
import BotResponse from '../interfaces/BotResponse';

class ProcessMessageService {
  static async execute(message: string): Promise<BotResponse> {
    try {
      const { BOT_URL } = process.env;

      if (!BOT_URL) {
        throw new Error('Error on execute process message');
      }

      const response = await axios.post<BotResponse>(BOT_URL, {
        message,
      });

      const botResponse = response.data;

      return botResponse;
    } catch (error: Error | any) {
      console.log('[ProcessMessageService.execute] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }
}

export default ProcessMessageService;

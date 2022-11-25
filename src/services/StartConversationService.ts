import axios from 'axios';
import BotResponse from '../interfaces/BotResponse';

class StartConversationService {
  static async execute(): Promise<BotResponse> {
    try {
      const { BOT_URL } = process.env;

      if (!BOT_URL) {
        throw new Error('Error on execute start conversation');
      }

      const response = await axios.post<BotResponse>(BOT_URL, {
        message: 'Olá',
      });

      const botResponse = response.data;

      return botResponse;
    } catch (error: Error | any) {
      console.log('[StartConversationService.execute] error -> ', error);
      throw new Error(error.response.data.message);
    }
  }
}

export default StartConversationService;

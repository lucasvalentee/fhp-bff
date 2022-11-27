import CardData from './CardData';

export default interface BotResponse {
  answer: string;
  intent: string;
  lastIntent: string;
  options?: string[];
  cardData?: CardData[];
}

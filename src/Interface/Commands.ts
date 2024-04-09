import { Message } from 'guilded.js';
import { Client } from '../ExtendedClient';

export interface Command {
  name: string;
  description: string;
  category?: string;
  usage?: string;
  execute(message: Message, args: string[], client: Client): Promise<void>;
}
import { Message } from 'guilded.js';
import { Client } from '../../ExtendedClient';
import CommandHandler from '../../Handlers/commandsHandler';

export default {
	name: 'messageCreated',
	async execute(message: Message, client: Client) {

		await CommandHandler.handleCommand(message, client); // Correct usage
		console.log('Message Content: ', message.content);
	}
};
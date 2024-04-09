import { Message } from 'guilded.js';
import { Client } from '../../ExtendedClient';
import CommandHandler from '../../Handlers/commandsHandler';

export default {
	name: 'messageCreated',
	async execute(message: Message, client: Client) {
		if (!message.author || message.author.type === 0 || message.author.id === client.user?.id) return;
		await CommandHandler.handleCommand(message, client);
		console.log(`${message.author.name || 'Unknown User'} Said ${message.content}`);
	}
};
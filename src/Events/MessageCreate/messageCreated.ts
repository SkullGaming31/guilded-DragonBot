import { Message } from 'guilded.js';
import { Client } from '../../ExtendedClient';
import CommandHandler from '../../Handlers/commandsHandler';
import { Event } from '../../Handlers/eventsHandler';

const messageCreated: Event = {
	name: 'messageCreated',
	async execute(message: Message, client: Client) {
		if (!message.author || message.author.type === 0 || message.author.id === client.user?.id) return;
		await CommandHandler.handleCommand(message, client);
		console.log(`${message.author.name || 'Unknown User'} Said ${message.content}`);
	}
};
export default messageCreated;
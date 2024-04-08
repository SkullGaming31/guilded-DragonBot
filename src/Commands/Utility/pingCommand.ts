import { Message } from 'guilded.js';
import { Client } from '../../ExtendedClient';
import { Command } from '../../Interface/Commands';

const pingCommand: Command = {
	name: 'ping',
	description: 'Checks the bot\'s response time.',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async execute(message: Message, args: string[], client: Client): Promise<void> {
		console.log('Ping command received!');
		await message.reply({ content: 'Pong!' });
	}
};
export default pingCommand;
import { Message } from 'guilded.js';
import { Client } from '../../ExtendedClient';
import { Command } from '../../Interface/Commands';

const pingCommand: Command = {
	name: 'ping',
	description: 'Checks the bot\'s response time.',
	category: 'Utility',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async execute(message: Message, args: string[], client: Client): Promise<void> {

		const response = {
			embeds: [{
				description: `🏓 ${client.ws.ping}ms 🏓`,
				color: 0x00ff00
			}],
			isPrivate: true
		};
		await message.reply(response);
	}
};
export default pingCommand;
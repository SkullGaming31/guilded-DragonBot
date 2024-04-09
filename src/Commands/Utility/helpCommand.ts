import { Message } from 'guilded.js';
import { Client } from '../../ExtendedClient';
import { Command } from '../../Interface/Commands';

const helpCommand: Command = {
	name: 'help',
	description: 'Get help for all commands',
	category: 'Utility',
	async execute(message: Message, args: string[], client: Client): Promise<void> {
		console.log('Args:', args);

		let commands;
		switch (args[0] ? args[0].trim() : '') {
			case 'Utility':
				console.log('Matching case: Utility');
				console.log('Client Commands before Filtering: ', client.commands);
				commands = client.commands.filter((cmd: Command) => cmd.category === 'Utility');
				console.log('Filtered commands:', commands);
				await message.reply({ content: commands.map((cmd: Command) => `**/${cmd.name}** | ${cmd.description}`).join('\n') || 'There are currently no commands in this category', isPrivate: true });
				break;
			case 'Community':
				console.log('Matching case: Community');
				commands = client.commands.filter((cmd: Command) => cmd.category === 'Community');
				console.log('Filtered commands:', commands);
				await message.reply({ content: commands.map((cmd: Command) => `**/${cmd.name}** | ${cmd.description}`).join('\n') || 'There are currently no commands in this category', isPrivate: true });
				break;
			default:
				console.log('Default case');
				await message.reply({ content: 'Please use /help [category] for help. [Community, Utility]', isPrivate: true });
				break;
		}
	}
};
export default helpCommand;
import { ClientEvents, Message } from 'guilded.js';
import { Client } from '../../ExtendedClient';
import { Command } from '../../Interface/Commands';

const emitCommand: Command = {
	name: 'emit',
	description: 'Used for Testing Events',
	category: 'Utility',
	usage: 'Usage: !emit eventName',
	async execute(message: Message, args: string[], client: Client): Promise<void> {
		// Check if the message is sent in a guild channel
		if (!message.server) {
			await message.reply({ content: 'This command can only be used in a guild channel.', isPrivate: true });
			return;
		}

		// Check if event name is provided
		if (args.length < 1) {
			await message.reply({ content: 'Please provide an event name to emit the event.', isPrivate: true });
			return;
		}

		const eventName = args[0] as keyof ClientEvents;

		// Find the member by ID
		const member = message.member;
		console.log('eventName:', args[0], 'UserID:', member?.id);
		if (!member) {
			await message.reply({ content: 'Member not found.', isPrivate: true });
			return;
		}

		// Emit the event with the provided event name and member
		client.emit(eventName, member);

		const tbd = await message.reply({ content: `Emitted event '${eventName}' for member '${member.username}'.`, isPrivate: true });
		await message.delete().catch((err: Error) => { console.error(err); });
		setTimeout(() => {
			tbd.delete().catch((err: Error) => { console.error(err); });
		}, 60000);
	}
};

export default emitCommand;
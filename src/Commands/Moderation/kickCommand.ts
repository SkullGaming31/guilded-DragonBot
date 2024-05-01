import { Member, Message } from 'guilded.js';
import { Client } from '../../ExtendedClient';
import { Command } from '../../Interface/Commands';

const kickCommand: Command = {
	name: 'kick',
	description: 'Kicks a user from the server.',
	category: 'Moderation',
	usage: '/kick <user> [reason]',
	async execute(message: Message, args: string[], client: Client): Promise<void> {
		// Check if the user has permissions to kick members

		// TODO: check member permissions for kick member

		// Check if both user and reason arguments are provided
		if (!args[0]) {
			await message.reply({ content: `Usage: ${kickCommand.usage}` });
			return;
		}// EAv8ALg2

		// Extract user and reason from args
		const userArg = args.shift(); // First argument should be the user
		// Combine the remaining arguments into a single string as the reason
		const reason = args.join(' ') || 'No reason provided';

		// Check if user argument is provided
		if (!userArg) {
			await message.reply({ content: 'Please provide the user to kick.' });
			return;
		}

		// Find the member to kick
		const memberToKick = message.client.members.cache.find((member: Member) => member.displayName === userArg || member.user?.name === userArg);
		if (!memberToKick) {
			await message.reply({ content: 'User not found.', isPrivate: true });
			return;
		}

		// Attempt to kick the member
		try {
			if (memberToKick.isOwner) { await message.reply({ content: 'The Owner cant be kicked from the server!' }); }
			await memberToKick.kick();
			await message.reply({ content: `Successfully kicked ${memberToKick.displayName}, Reason: \`${reason}\`` });
			await client.messages.send('1153a4bf-94c4-4bff-b78c-d9d196cee325', `Successfully kicked ${memberToKick.displayName}, Reason: \`${reason}\``);
		} catch (error) {
			console.error('Error kicking member:', error);
			await message.reply({ content: 'An error occurred while trying to kick the user.', isPrivate: true });
		}
	}
};

export default kickCommand;

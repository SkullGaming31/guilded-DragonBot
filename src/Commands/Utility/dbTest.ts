import { Message } from 'guilded.js';
import { Client } from '../../ExtendedClient';
import { Command } from '../../Interface/Commands';
import testSchema from '../../Database/Schemas/testSchema';

const dbTestCommand: Command = {
	name: 'dbtest',
	description: 'test the Database connection',
	category: 'Utility',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async execute(message: Message, args: string[], client: Client): Promise<void> {
		let finalData;
		const guildId = message.serverId;
		const userId = message.authorId;

		if (!guildId || !userId) {
			// Handle the case where either guildId or userId is null
			console.error('GuildID or UserID is null');
			return;
		}
		const data = testSchema.findOne({ GuildID: guildId, UserID: userId });

		if (!data) {
			finalData = 'Compiling Data, run command again to see';
			testSchema.create({
				GuildID: guildId,
				UserID: userId
			});
		}

		if (data) { finalData = data; }

		const response = {
			embeds: [{
				description: `\`\`\`${finalData}\`\`\``,
				color: 0x000000
			}],
			isPrivate: true
		};

		try {
			await message.reply(response);
		} catch (error) {
			console.error(error);
		}
	}
};
export default dbTestCommand;
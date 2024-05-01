import { MemberBan } from 'guilded.js';
import { Event } from '../../Handlers/eventsHandler';

const guildBanAdd: Event = {
	name: 'memberBanned',
	async execute(ban: MemberBan) {
		const { author, reason } = ban;
		const logsChannelID = '1153a4bf-94c4-4bff-b78c-d9d196cee325';

		const response = {
			embeds: [{
				title: 'DragonBot Logs',
				description: `A user has been Banned. name: ${author?.name}, Reason: \`${reason}\` ${ban.createdAt}`,
				color: 0x00ff00
			}]
		};
		await ban.client.messages.send(logsChannelID, response);
	}
};

export default guildBanAdd;
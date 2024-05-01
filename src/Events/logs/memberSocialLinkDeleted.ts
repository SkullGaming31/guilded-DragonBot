import { SocialLinkPayload } from 'guilded.js';
import { Event } from '../../Handlers/eventsHandler';
import { Client } from '../../ExtendedClient';

const memberSocialLinkDeleted: Event = {
	name: 'memberSocialLinkDeleted',
	once: false,
	async execute(serverId: string, socialLink: SocialLinkPayload, client: Client) {
		const { type, userId } = socialLink;

		const logsChannelID: string = '1153a4bf-94c4-4bff-b78c-d9d196cee325';
		if (logsChannelID === undefined) return;

		const response = {
			embeds: [{
				title: 'DragonBot Logs',
				description: `${userId} Unlinked \`${type}\``,
				color: 0xFF0000
			}]
		};
		await client.messages.send(logsChannelID, response);
	},
};
export default memberSocialLinkDeleted;
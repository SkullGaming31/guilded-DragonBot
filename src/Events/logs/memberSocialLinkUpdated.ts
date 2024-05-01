import { SocialLinkPayload } from 'guilded.js';
import { Event } from '../../Handlers/eventsHandler';
import { Client } from '../../ExtendedClient';

const memberSocialLinkUpdated: Event = {
	name: 'memberSocialLinkUpdated',
	async execute(serverId: string, socialLinks: SocialLinkPayload, client: Client) {
		const { type, handle, userId } = socialLinks;

		const logsChannelID: string = '1153a4bf-94c4-4bff-b78c-d9d196cee325';
		if (logsChannelID === undefined) return;

		const response = {
			embeds: [{
				title: 'DragonBot Logs',
				description: `${userId} updated \`${type}\` UserHandle: \`@${handle}\``,
				color: 0x0000FF
			}]
		};
		await client.messages.send(logsChannelID, response);
	}
};
export default memberSocialLinkUpdated;
import { SocialLinkPayload } from 'guilded.js';
import { Event } from '../../Handlers/eventsHandler';
import { Client } from '../../ExtendedClient';

const sociallinkCreated: Event = {
	name: 'memberSocialLinkCreated',
	async execute(serverId: string, socialLink: SocialLinkPayload, client: Client) {
		console.log(socialLink);
		const { type, handle, userId } = socialLink;

		const logsChannelID: string = '1153a4bf-94c4-4bff-b78c-d9d196cee325';
		if (logsChannelID === undefined) return;

		const response = {
			embeds: [{
				title: 'DragonBot Logs',
				description: `${userId} linked \`${type}\` UserHandle: \`@${handle}\``,
				color: 0x00ff00
			}]
		};
		await client.messages.send(logsChannelID, response);
	}
};

export default sociallinkCreated;
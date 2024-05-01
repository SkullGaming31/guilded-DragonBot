import { Channel, ChannelType } from 'guilded.js';
import { Event } from '../../Handlers/eventsHandler';

/* 
ChannelType {
	Announcements = 0,
	Chat = 1,
	Calendar = 2,
	Forums = 3,
	Media = 4,
	Docs = 5,
	Voice = 6,
	List = 7,
	Scheduling = 8,
	Stream = 9,
}
*/

// Helper function to get the name of the channel type
function getChannelTypeName(type: ChannelType): string {
	switch (type) {
		case ChannelType.Announcements:
			return 'Announcements';
		case ChannelType.Chat:
			return 'Chat';
		case ChannelType.Calendar:
			return 'Calendar';
		case ChannelType.Forums:
			return 'Forums';
		case ChannelType.Media:
			return 'Media';
		case ChannelType.Docs:
			return 'Docs';
		case ChannelType.Voice:
			return 'Voice';
		case ChannelType.List:
			return 'List';
		case ChannelType.Scheduling:
			return 'Scheduling';
		case ChannelType.Stream:
			return 'Stream';
		default:
			console.log(ChannelType);
			return 'Unknown';
	}
}
const channelCreateEvent: Event = {
	name: 'channelCreated',
	async execute(channel: Channel) {
		const { name } = channel;

		const logsChannelID: string = '1153a4bf-94c4-4bff-b78c-d9d196cee325';
		if (logsChannelID === undefined) return;
		if (channel.type !== ChannelType.Chat) return;

		const typeName = getChannelTypeName(channel.type);
		const response = {
			embeds: [{
				title: 'DragonBot Logs',
				description: `A \`${typeName}\` Channel has been Created by: userID: ${channel.createdBy}, ChannelName: ${name}`,
				color: 0x00ff00
			}]
		};
		await channel.client.messages.send(logsChannelID, response);
	}
};
export default channelCreateEvent;
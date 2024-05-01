import { Channel, ChannelType } from 'guilded.js';
import { Event } from '../../Handlers/eventsHandler';

const channelDelete: Event = {
	name: 'channelDeleted',
	async execute(channel: Channel) {
		const { name } = channel;

		const logsChannelID: string = '1153a4bf-94c4-4bff-b78c-d9d196cee325';
		if (logsChannelID === undefined) return;
		if (channel.type !== ChannelType.Chat) return;

		const response = {
			embeds: [{
				title: 'DragonBot Logs',
				description: `A channel has been Deleted by: userID: ${channel.createdBy}, ChannelName: ${name}`,
				color: 0x00ff00
			}]
		};
		await channel.client.messages.send(logsChannelID, response);// channel.createdBy gives users ID
	}
};
export default channelDelete;
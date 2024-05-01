import { Event } from '../../Handlers/eventsHandler';
import { Client } from '../../ExtendedClient';
import { MemberRemovedEvent } from 'guilded.js/types/events';
import { Server } from 'guilded.js';

const memberRemovedEvent: Event = {// workign on getting users name to display when a user leaves a server.
	name: 'memberRemoved',
	async execute(event: MemberRemovedEvent, client: Client) {
		const logsChannelID: string = '1153a4bf-94c4-4bff-b78c-d9d196cee325';
		if (!logsChannelID) return;
		const servers = await client.fetchServers();
		const server = servers.find((server: Server) => server.id === event.serverId);
		const serverName = server ? server.name : 'Unknown Server';
		// Fetch the member who was removed from the server
		const removedMember = await client.members.fetch(event.serverId, event.userId);
		const memberName = removedMember ? removedMember.displayName : 'Unknown User';
		if (event.isBan) {
			await client.messages.send(logsChannelID, `${memberName} was banned from ${serverName}`);
		} else if (event.isKick) {
			await client.messages.send(logsChannelID, `${memberName} was Kicked from ${serverName}`);
		} else {
			await client.messages.send(logsChannelID, `${memberName} has left the server`);
			console.log('Something went wrong');
		}
	}
};
export default memberRemovedEvent;
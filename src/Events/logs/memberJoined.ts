import { Embed, Member, Server } from 'guilded.js';
import { Event } from '../../Handlers/eventsHandler';
import { Client } from '../../ExtendedClient';

const memberJoinedEvent: Event = {
	name: 'memberJoined',
	async execute(member: Member, client: Client) {
		if (!member.user) return;
		const twitch = member.socialLinks.get('twitch');
		const facebook = member.socialLinks.get('facebook');
		const YouTube = member.socialLinks.get('youtube');

		const welcomeChannel: string = '1f0e43f3-9979-4883-8904-d703e0869893';
		const response = new Embed()
			.addFields([
				{
					name: 'Account Created: ',
					value: `${member.user?.createdAt}`
				},
				{
					name: 'User Joined: ',
					value: `${member.joinedAt}`
				},
				...(twitch ? [{ name: 'Twitch:', value: `${twitch.handle}` }] : []),
				...(facebook ? [{ name: 'Facebook:', value: `${facebook.handle}` }] : []),
				...(YouTube ? [{ name: 'YouTube:', value: `${YouTube.handle}` }] : [])
			])
			.setThumbnail(member.user?.avatar ? member.user.avatar : undefined)
			.setFooter(`UserID: ${member.id}`)
			.setTimestamp();
		try {
			const servers = await client.fetchServers();
			const server = servers.find((server: Server) => server.id === member.serverId);
			const serverName = server ? server.name : 'Unknown Server';
			response.setTitle(`Welcome to ${serverName}`);

			if (twitch) {
				await member.addRole(37428068);
			} else if (facebook) {
				await member.addRole(37428074);
			} else if (YouTube) { member.addRole(37428102); }

			await member.client.messages.send(welcomeChannel, response);
		} catch (error) {
			console.error(error);
		}
	}
};

export default memberJoinedEvent;
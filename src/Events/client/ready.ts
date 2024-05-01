import { Client } from '../../ExtendedClient';
import { Event } from '../../Handlers/eventsHandler';

const readyEvent: Event = {
	name: 'ready',
	once: true,
	async execute(client: Client) {
		const { user } = client;
		console.log(`${user?.name} has logged in`);

		client.setStatus({ emoteId: 2293100, content: 'In Development', expiresAt: undefined });
	}
};
export default readyEvent;
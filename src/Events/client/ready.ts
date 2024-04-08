import { Client } from '../../ExtendedClient';

export default {
	name: 'ready',
	once: true,
	async execute(client: Client) {
		const { user } = client;
		console.log(`${user?.name} has logged in`);

		client.setStatus({ emoteId: 2293100, content: 'In Development', expiresAt: undefined });
	}
};
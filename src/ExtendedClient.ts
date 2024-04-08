/* eslint-disable @typescript-eslint/no-explicit-any */

import { Collection, Client as GuildedClient } from 'guilded.js';

export class Client extends GuildedClient {
	public commands: Collection<any, any>;

	constructor(options?: any) {
		super(options);
		this.commands = new Collection();
	}
}
import { config } from 'dotenv';
import { Client } from './ExtendedClient';
import { Collection } from 'guilded.js';
import CommandHandler from './Handlers/commandsHandler';
import EventHandler from './Handlers/eventsHandler';
import Database from './Database';
import { Command } from './Interface/Commands';

class DragonBot {
	private client: Client;
	private eventHandler: EventHandler;
	private db: Database;

	constructor() {
		config();

		this.client = new Client({ token: process.env.TOKEN as string });
		this.eventHandler = new EventHandler(this.client);
		this.db = new Database(process.env.MONGO_URI as string);
	}

	public async start(): Promise<void> {
		await this.loadHandlers();
		await this.connect();
		this.client.login();
	}

	private async loadHandlers(): Promise<void> {
		await this.eventHandler.loadEventsFromDirectory('./src/Events');
		await CommandHandler.loadCommandsFromDirectory('./src/Commands');
		this.client.commands = new Collection<string, Command>(CommandHandler.commands);
	}

	private async connect(): Promise<void> {
		await this.db.connect();
	}
}

const dragonBot = new DragonBot();
dragonBot.start();
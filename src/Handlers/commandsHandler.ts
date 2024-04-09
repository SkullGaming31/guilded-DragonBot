import { Message } from 'guilded.js';
import { Command } from '../Interface/Commands';
import { Client } from '../ExtendedClient';
import fs from 'fs';
import path from 'path';

class CommandHandler {
	private prefix: string;
	public commands: Map<string, Command>;

	constructor(prefix: string) {
		this.prefix = prefix;
		this.commands = new Map<string, Command>();
	}

	registerCommand(command: Command): void {
		if (!command) {
			console.error('Command is undefined or null');
			return;
		}
		// console.log('Registering command:', command);
		this.commands.set(command.name.toLowerCase(), command);
	}

	async loadCommandsRecursively(dir: string) {
		const files = fs.readdirSync(dir);
		for (const file of files) {
			const filePath = path.join(dir, file);
			const stat = fs.statSync(filePath);
			if (stat.isDirectory()) {
				await this.loadCommandsRecursively(filePath); // Recursively traverse subdirectories
			} else if (file.endsWith('.ts')) {
				try {
					const commandFilePath = path.resolve(filePath);
					const commandModule = await import(commandFilePath);
					const command = commandModule.default;
					if (command && command.name) {
						this.registerCommand(command);
						console.log(`Loaded command: ${command.name}`);
					} else {
						console.error(`Failed to load command from file: ${filePath}`);
					}
				} catch (error) {
					console.error(`Error loading command from file: ${filePath}`);
					console.error(error);
				}
			}
		}
	}

	async loadCommandsFromDirectory(directory: string): Promise<void> {
		await this.loadCommandsRecursively(directory);
	}

	async getCommand(commandName: string): Promise<Command | undefined> {
		// console.log('Retrieving command:', commandName);
		return this.commands.get(commandName.toLowerCase());
	}

	async handleCommand(message: Message, client: Client): Promise<void> {
		const content = message.content.trim();

		// console.log('Processing message:', content); // Log the message content

		if (!content.startsWith(this.prefix)) return;

		const args = content.slice(this.prefix.length).split(/ +/);
		const commandName = args.shift()?.toLowerCase();

		// console.log('Command name extracted from message:', commandName);

		if (!commandName) return;

		const command = await this.getCommand(commandName);
		// console.log('Retrieved command:', command);

		if (!command) {
			console.log('Command not found.');
			return;
		}

		try {
			await command.execute(message, args, client);
		} catch (error) {
			console.error(error);
		}
	}
}

// Create a single instance of CommandHandler
const commandHandler = new CommandHandler('/'); // Set your prefix
export default commandHandler;
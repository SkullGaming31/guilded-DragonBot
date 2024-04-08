/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';

// export default async (client: Client) => {
// 	const eventFolders = fs.readdirSync('./src/Events');
// 	for (const folder of eventFolders) {
// 		const eventFiles = fs.readdirSync(path.join('./src/Events', folder)).filter(files => files.endsWith('.ts'));
// 		for (const file of eventFiles) {
// 			// Construct the full path to the event file
// 			const eventFilePath = path.resolve('./src/Events', folder, file);
// 			// Import the event module dynamically
// 			const eventModule = await import(eventFilePath);
// 			const eventName = file.split('.')[0] as keyof ClientEvents; // Specify eventName type

// 			// Check if the event is a default export
// 			if (eventModule.default) {
// 				// Add event listener based on whether it's a once event or not
// 				if (eventModule.default.once) {
// 					client.on(eventName, (...args: any[]) => eventModule.default.execute(...args, client));
// 				} else {
// 					client.on(eventName, (...args: any[]) => eventModule.default.execute(...args, client));
// 				}
// 				console.info(`SYSTEM: >> ${eventName} Event Loaded`);
// 			} else {
// 				console.error(`Error loading event ${eventName}: No default export found`);
// 			}
// 		}
// 	}
// };
import { ClientEvents } from 'guilded.js';
import { Client } from '../ExtendedClient';

interface Event {
  name: keyof ClientEvents;
  once?: boolean;
  execute(...args: any[]): Promise<void> | void;
}

class EventHandler {
	private client: Client;
	private events: Map<keyof ClientEvents, Event>;

	constructor(client: Client) {
		this.client = client;
		this.events = new Map<keyof ClientEvents, Event>();
	}

	registerEvent(event: Event): void {
		const { name, once, execute } = event;
		if (!this.events.has(name)) {
			this.events.set(name, { name, once, execute });
			const listener = (...args: any[]) => execute(...args, this.client);
			if (once) {
				this.client.once(name, listener);
			} else {
				this.client.on(name, listener);
			}
			console.info(`SYSTEM: >> ${name} Event Loaded`);
		} else {
			console.warn(`WARNING: Event '${name}' already registered.`);
		}
	}

	async loadEventsFromDirectory(directory: string): Promise<void> {
		const eventFolders = fs.readdirSync(directory);
		for (const folder of eventFolders) {
			const eventFiles = fs.readdirSync(path.join(directory, folder)).filter(files => files.endsWith('.ts'));
			for (const file of eventFiles) {
				const eventFilePath = path.resolve(directory, folder, file);
				const eventModule = await import(eventFilePath);
				// Capture eventName before conditional check
				const eventName = file.split('.')[0] as keyof ClientEvents;
				if (eventModule.default) {
					const eventName = file.split('.')[0] as keyof ClientEvents;
					this.registerEvent({
						name: eventName,
						once: eventModule.default.once || false, // Set default to non-once event
						execute: eventModule.default.execute,
					});
				} else {
					console.error(`Error loading event ${eventName}: No default export found`);
				}
			}
		}
		return Promise.resolve();
	}
}
export default EventHandler;
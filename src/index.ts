/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
import { config } from 'dotenv';
config();
import { Client } from './ExtendedClient';
// import fs from 'fs';
import { Collection } from 'guilded.js';
import CommandHandler from './Handlers/commandsHandler';
import EventHandler from './Handlers/eventsHandler';

const client = new Client({ token: process.env.TOKEN as string, });
client.commands = new Collection();

// const handlerFiles = fs.readdirSync('./src/Handlers').filter(f => f.endsWith('.ts'));

// for (const handler of handlerFiles) {
// 	import(path.resolve(`./src/Handlers/${handler}`))
// 		.then(module => module.default(client)) // Call the imported module's default export function with client
// 		.catch(error => console.error(`Error loading handler ${handler}:`, error)); // Handle errors
// }

const eventHandler = new EventHandler(client);

(async () => {
	await eventHandler.loadEventsFromDirectory('./src/Events');
	await CommandHandler.loadCommandsFromDirectory('./src/Commands');
})();

// const badWords = ['fuck', 'bitch', 'dick'];
// const linkWhiteList = ['https://twitch.tv/', 'twitch.tv/', 'https://instagram.com/', 'instagram.com/', 'https://tiktok.com/@', 'tiktok.com/@'];

client.on('error', (reason: string, err: Error) => { console.error(`Reason: ${reason}, Error ${err}:`); });

client.login();
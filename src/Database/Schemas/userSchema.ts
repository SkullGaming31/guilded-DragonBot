import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
	GuildID: string;
	username: string;
	accessToken: string;
}

export const userSchema = new Schema<IUser>({
	GuildID: String,
	username: String,
	accessToken: String
});

export default model<IUser>('User', userSchema);
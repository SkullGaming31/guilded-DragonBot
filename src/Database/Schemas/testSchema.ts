import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
	GuildID: string;
	UserID: string;
}

export const testSchema = new Schema<IUser>({
	GuildID: String,
	UserID: String,
});

export default model<IUser>('testSchema', testSchema);
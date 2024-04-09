import mongoose, { Connection } from 'mongoose';
import userSchema, { IUser } from './Schemas/userSchema';

class Database {
	private uri: string;
	private db: Connection;

	constructor(uri: string) {
		this.uri = uri;
		this.db = mongoose.connection;
		this.db.on('error', console.error.bind(console, 'Connection error:'));
		this.db.once('open', () => { console.log('Connected to the database'); });
	}
	async connect() {
		try {
			await mongoose.connect(this.uri);
		} catch (error) {
			console.error('Error connecting to the database:', error);
			throw error;
		}
	}

	async createUser(userData: IUser): Promise<IUser> {
		try {
			const newUser = new userSchema(userData);
			await newUser.save();
			console.log('User created successfully:', newUser);
			return newUser;
		} catch (error) {
			console.error('Error creating user:', error);
			throw error;
		}
	}

	async getUsers(): Promise<IUser[]> {
		try {
			const users = await userSchema.find();
			console.log('Retrieved users:', users);
			return users;
		} catch (error) {
			console.error('Error retrieving users:', error);
			throw error;
		}
	}

	async updateUser(userId: string, newData: Partial<IUser>): Promise<IUser | null> {
		try {
			const updatedUser = await userSchema.findByIdAndUpdate(userId, newData, { new: true });
			console.log('User updated successfully:', updatedUser);
			return updatedUser;
		} catch (error) {
			console.error('Error updating user:', error);
			throw error;
		}
	}

	async deleteUser(userId: string): Promise<IUser | null> {
		try {
			const deletedUser = await userSchema.findByIdAndDelete(userId);
			console.log('User deleted successfully:', deletedUser);
			return deletedUser;
		} catch (error) {
			console.error('Error deleting user:', error);
			throw error;
		}
	}
}
export default Database;
import IUser from '../interfaces/userInterface.js';
import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: String, emun: ['User', 'Admin'], default: 'User' },
});

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;

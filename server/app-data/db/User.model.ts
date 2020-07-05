import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
});

const User = model<IUser>('User', UserSchema);

export default User;

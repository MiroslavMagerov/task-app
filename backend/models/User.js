import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  manager: { type: Boolean, required: true },
});

const User = mongoose.model('User', UserSchema, 'users');
export default User;

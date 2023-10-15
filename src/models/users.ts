import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('users', UserSchema);

// User Actions
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  UserModel.create(values).then((user) => ({
    name: user.email,
    username: user.username,
  }));

import mongoose from 'mongoose';

const connectDb = () => {
  const MONGO_URL =
    'mongodb+srv://contacts:k4aHFj2MuI2vIGp4@cluster0.ty29as1.mongodb.net/?retryWrites=true&w=majority';
  mongoose.Promise = Promise;
  mongoose.connect(MONGO_URL);
  mongoose.connection.on('error', (err: Error) => console.log(err));
};
export default connectDb
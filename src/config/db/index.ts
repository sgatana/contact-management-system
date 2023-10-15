import mongoose from 'mongoose';
import ENV from '../env'
const connectDb = () => {
  mongoose.Promise = Promise;
  mongoose.connect(ENV.MONGO_URI);
  mongoose.connection.on('error', (err: Error) => console.log(err));
};
export default connectDb
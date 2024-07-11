import mongoose from 'mongoose';
import { dbUri } from './environment.js';

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;

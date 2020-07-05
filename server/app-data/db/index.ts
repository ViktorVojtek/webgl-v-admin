import mongoose from 'mongoose';

import config from '../config';

const { dbName } = config;
const MONGO_URL = `mongodb://localhost:27017/${dbName}`;

const mongoStart: () => Promise<void> = async () => {
  try {
    mongoose.connect(MONGO_URL, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('DB connected'));
  } catch (err) {
    throw new Error(err);
  }
};

export default mongoStart;

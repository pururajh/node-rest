import { mongoose } from 'mongoose';
import { getConfig } from './config';
const config = getConfig(process.env.NODE_ENV);
//mongoose.
export const connect = () => mongoose.connect(config.MONGO_URI);
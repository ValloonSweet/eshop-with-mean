import mongoose from "mongoose";
require('dotenv/config');

async function connect() {
    const localdb = process.env.ME_CONFIG_MONGODB_URL as string;
    const dbUriAtlas = process.env.MONGO_URI as string;
    const env = process.env.ENV;

    console.log(env);
    try {
        await mongoose.connect(env === 'dev' ? localdb : dbUriAtlas)
        console.log('connected');
    } catch (error) {
        console.error('cannot connect');
        console.error(error);
        process.exit(1)
    }
}

export default connect

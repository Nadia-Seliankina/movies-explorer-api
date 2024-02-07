import 'dotenv/config'; // подключать над роутерами!

const { JWT_SECRET, MONGO_URL, NODE_ENV } = process.env;

export const JWTconf = NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret';

export const URLconf = NODE_ENV === 'production' ? MONGO_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb';

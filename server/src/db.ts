import { createConnection } from 'typeorm';
import path from 'path';
import { PROD, DB_USER, DB_HOST, DB_NAME, DB_PASS } from './constants';
import UserEntity from './entities/User';
import MembersEntity from './entities/Members';
import ChannelEntity from './entities/Channel';
import MessageEntity from './entities/Message';

const connectDB = async () => {
  await createConnection({
    type: 'postgres',
    entities: [UserEntity, ChannelEntity, MembersEntity, MessageEntity],
    logging: !PROD,
    synchronize: true,
    port: 5432,
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    migrations: [path.join(__dirname, './migrations/*.ts')],
  }).then(() => console.log('DB CONNECTED SUCCESSFULY'));
};

export default connectDB;

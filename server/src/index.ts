import 'reflect-metadata';
import { config } from 'dotenv';
config({ path: './config.env' });

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import connections from './db';
import { PORT } from './constants';
import authChecker from './utils/authChecker';
import { AuthResolver, UserResolver, ChannelResolver } from './resolvers';

const main = async () => {
  await connections();

  const app = express();

  app.use(cookieParser());

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, UserResolver, ChannelResolver],
      validate: false,
      authChecker,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => console.log(`Server starting at PORT: ${PORT}`));
};

main();

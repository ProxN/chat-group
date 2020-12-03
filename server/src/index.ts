import 'reflect-metadata';
import { config } from 'dotenv';
config({ path: './config.env' });

import cookieParser from 'cookie-parser';
import http from 'http';
import { PubSub } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import connections from './db';
import { PORT } from './constants';
import authChecker from './utils/authChecker';
import { AuthResolver, UserResolver, ChannelResolver, MessageResolver } from './resolvers';

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
  const pubsub = new PubSub();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, UserResolver, ChannelResolver, MessageResolver],
      validate: false,
      authChecker,
      pubSub: pubsub,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      pubsub,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => console.log(`Server starting at PORT: ${PORT}`));
};

main();

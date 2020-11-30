import 'reflect-metadata';
import { config } from 'dotenv';
config({ path: './config.env' });

import cookieParser from 'cookie-parser';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import connections from './db';
import { PORT } from './constants';
import authChecker from './utils/authChecker';
import { AuthResolver, UserResolver } from './resolvers';

const main = async () => {
  await connections();

  const app = express();

  app.use(cookieParser());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, UserResolver],
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

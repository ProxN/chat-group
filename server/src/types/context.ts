import { Request, Response } from 'express';
import { PubSubEngine } from 'apollo-server-express';

export type Context = {
  req: Request;
  res: Response;
  pubsub: PubSubEngine;
};

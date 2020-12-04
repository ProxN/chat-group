import { PubSubEngine } from 'graphql-subscriptions';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import Message from '../../entities/Message';
import User from '../../entities/User';
import { Context } from '../../types/context';
import { ErrorResponse } from '../../types/errorType';
import * as messageErrors from './errors';

@ObjectType()
export class MessageResponse extends ErrorResponse {
  @Field(() => Message, { nullable: true })
  message?: Message;
}

@Resolver()
class MessageResolver {
  @Authorized()
  @Query(() => [Message])
  async getMessages(@Arg('channelId') channelId: string): Promise<Message[]> {
    if (!channelId) return [];
    const messages = await getConnection()
      .getRepository(Message)
      .createQueryBuilder('m')
      .where('m.channelId = :channelId', { channelId })
      .leftJoinAndMapOne('m.user', User, 'u', 'u.id = m.userId')
      .orderBy('m."createdAt"')
      .getMany();

    return messages;
  }

  @Authorized()
  @Mutation(() => MessageResponse)
  async createMessage(
    @PubSub() pubsub: PubSubEngine,
    @Arg('text') text: string,
    @Arg('channelId') channelId: string,
    @Ctx() { req }: Context
  ): Promise<MessageResponse> {
    if (!text) {
      return { error: messageErrors.EmptyMessage };
    }

    const message = await Message.create({
      channelId: channelId,
      userId: req.user.id,
      message: text,
    }).save();

    await pubsub.publish('MESSAGE', message);
    return { message };
  }

  @Subscription({ topics: 'MESSAGE' })
  onMessageAdded(@Root() message: Message): Message {
    return message;
  }
}

export default MessageResolver;

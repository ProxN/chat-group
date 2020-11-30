import { Arg, Authorized, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import Channel from '../../entities/Channel';
import * as channelErrors from './errors';
import { ErrorResponse } from '../../types/errorType';

@ObjectType()
export class ChannelResponse extends ErrorResponse {
  @Field(() => Channel, { nullable: true })
  channel?: Channel;
}

@Resolver()
class ChannelResolver {
  @Authorized()
  @Mutation(() => ChannelResponse)
  async createChannel(
    @Arg('name') name: string,
    @Arg('description') description: string
  ): Promise<ChannelResponse> {
    if (!name || !description) {
      return { error: channelErrors.EmptyFields };
    }

    let channel;
    try {
      channel = await Channel.create({
        name,
        description,
      }).save();
    } catch (err) {
      if (err.code === '23505') {
        return { error: channelErrors.AlreadyExists };
      }
    }

    return { channel };
  }
}

export default ChannelResolver;

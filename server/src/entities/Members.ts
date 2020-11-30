import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import Channel from './Channel';
import User from './User';

@ObjectType()
@Entity()
class Members extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId!: string;

  @Field()
  @PrimaryColumn()
  channelId!: string;

  @Field()
  @CreateDateColumn()
  joined?: Date;

  @ManyToOne(() => Channel)
  @JoinColumn()
  channel!: Channel;

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User;
}

export default Members;

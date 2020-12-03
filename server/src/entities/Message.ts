import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Channel from './Channel';
import User from './User';

@ObjectType()
@Entity()
class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  message!: string;

  @Field()
  @Column()
  channelId!: string;

  @Field()
  @Column()
  userId!: string;

  @ManyToOne(() => Channel, (channel) => channel.messages)
  channel!: Channel;

  @ManyToOne(() => User)
  user!: User;

  @Field()
  @CreateDateColumn()
  createdAt?: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt?: Date;
}

export default Message;

import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
class Channel extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @CreateDateColumn()
  createdAt?: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt?: Date;
}

export default Channel;

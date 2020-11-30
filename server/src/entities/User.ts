import { Field, ObjectType } from 'type-graphql';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@ObjectType()
@Entity()
class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'text', nullable: true })
  passwordResetToekn?: string | null;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires?: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  passwordChanged?: Date;

  @Field()
  @CreateDateColumn()
  createdAt?: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt?: Date;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  createResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetToekn = hashedToken;
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

    return resetToken;
  }

  passwordChangedAfter(JWTtimestamp: number) {
    if (this.passwordChanged) {
      const changedTimeStamp = Math.floor(this.passwordChanged.getTime() / 1000);
      return JWTtimestamp < changedTimeStamp;
    }
    return false;
  }
}

export default User;

import { uuid } from '@base/shared/util';
import { createPassword } from '@base/server/util';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import validator from 'validator';

type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  timestamps: true,
})
class User {
  @Prop({
    minlength: 6,
    maxlength: 255,
    required: [true, 'NAME_IS_BLANK'],
    default: 'NAME_IS_BLANK',
  })
  name: string;

  @Prop({
    validate: validator.isEmail,
    lowercase: true,
    required: [true, 'EMAIL_IS_BLANK'],
  })
  email: string;

  @Prop({
    validate: validator.isAlphanumeric,
    lowercase: true,
    required: true,
  })
  username: string;

  @Prop({
    minlength: 5,
    maxlength: 1024,
    required: [true, 'PASSWORD_IS_BLANK'],
    default: 'PASSWORD_IS_BLANK',
  })
  password: string;

  @Prop()
  salt: string;

  @Prop({
    default: ['user'],
  })
  roles: string[];

  @Prop({
    validate: validator.isUUID,
    required: [true, 'UUID_IS_BLANK'],
    default: uuid,
  })
  verification: string;

  @Prop({
    default: false,
  })
  verified: boolean;

  @Prop({
    default: Date.now,
  })
  verificationExpires: Date;

  @Prop({
    default: 0,
  })
  loginAttempts: number;

  @Prop({
    default: Date.now,
  })
  blockExpires: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (nextMiddlewareFn) {
  if (!this.isModified('password')) return nextMiddlewareFn();

  try {
    Object.assign(this, createPassword(this.password));
    nextMiddlewareFn();
  } catch (err) {
    nextMiddlewareFn(err as Error);
  }
});

export { UserDocument, User, UserSchema };

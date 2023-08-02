import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class RefreshToken {
  @Prop({
    type: MongoSchema.ObjectId,
    required: true,
    ref: 'User',
  })
  userId: string;

  @Prop()
  refreshToken: string;

  @Prop()
  ip: string;

  @Prop()
  browser: string;

  @Prop()
  country: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

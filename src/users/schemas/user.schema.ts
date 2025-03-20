import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: number;

  @Prop()
  name: string;

  @Prop()
  ega: number;

  @Prop()
  phone: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updated: Date;
}

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  phone: String,
  age: Number,
  createdAt: Date,
  updatedAt: Date,
});

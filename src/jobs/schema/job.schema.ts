import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type JobsDocument = HydratedDocument<Jobs>;

@Schema({ timestamps: true })
export class Jobs {
  @Prop({ required: true })
  name: string;

  @Prop()
  skill: string[];

  @Prop()
  quantity: string;

  @Prop()
  description: string;

  @Prop()
  level: string;

  @Prop()
  location: string;

  @Prop()
  salary: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  isActive: boolean;

  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    logo: string;
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updated: Date;

  @Prop()
  isDelete: boolean;

  @Prop()
  deleteAt: Date;
}

export const JobsSchema = SchemaFactory.createForClass(Jobs);

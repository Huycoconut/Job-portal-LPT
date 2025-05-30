import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ timestamps: true })
export class Resume {
  @Prop()
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  jobId: mongoose.Schema.Types.ObjectId;

  @Prop()
  company: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop()
  url: string;

  @Prop()
  status: string;

  @Prop()
  history: {
    status: string;
    updateAt: Date;
    updateBy: { _id: mongoose.Schema.Types.ObjectId; email: string };
  }[];

  @Prop({ type: Object })
  createBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updateBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deleteBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
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

export const ResumeSchema = SchemaFactory.createForClass(Resume);

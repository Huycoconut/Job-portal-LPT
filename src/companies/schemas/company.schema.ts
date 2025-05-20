import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updated: Date;

  @Prop()
  isDelete: boolean;

  @Prop()
  deleteAt: Date;

  @Prop()
  createBy: {
    _id: string;
    email: string;
  };
  @Prop()
  updateBy: {
    _id: string;
    email: string;
  };
  @Prop()
  deleteBy: {
    _id: string;
    email: string;
  };
}

export const CompanySchema = SchemaFactory.createForClass(Company);

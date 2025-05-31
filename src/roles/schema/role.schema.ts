import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/companies/schemas/company.schema';
import { Jobs } from 'src/jobs/schema/job.schema';
import { Permission } from 'src/permissions/schema/permission.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  isActive: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Permission.name })
  permisstion: Permission[];

  @Prop()
  url: string;

  @Prop()
  status: string;

  @Prop({ type: mongoose.Schema.Types.Array })
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

export const RoleSchema = SchemaFactory.createForClass(Role);

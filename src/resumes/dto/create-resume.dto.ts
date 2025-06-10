import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsDate,
  IsNotEmpty,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { Jobs } from 'src/jobs/schema/job.schema';
import { Resume } from '../schema/resume.schema';

//Khi cần validate 1 array thì tách ra thêm 1 class, nếu trong class có object và muốn validate object đó thì tiếp tục
//tách object đó ra và validate
export class CreateResumeDto {
  @IsNotEmpty({ message: 'userId không được bỏ trống' })
  userId: mongoose.Schema.Types.ObjectId;

  @IsEmail()
  @IsNotEmpty({ message: 'userId không được bỏ trống' })
  email: string;

  @IsNotEmpty({ message: 'URL không được bỏ trống' })
  url: string;

  @IsNotEmpty({ message: 'status không được bỏ trống' })
  status: string;

  @IsNotEmpty({ message: 'jobId không được bỏ trống' })
  jobId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'companyId không được bỏ trống' })
  companyId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
  @IsNotEmpty({ message: 'URL không được bỏ trống' })
  url: string;

  @IsNotEmpty({ message: 'status không được bỏ trống' })
  @IsMongoId({ message: 'companyId is a mongo id' })
  comapnyId: string;

  @IsNotEmpty({ message: 'jobId không được bỏ trống' })
  @IsMongoId({ message: 'jobId is a mongo id' })
  jobId: mongoose.Schema.Types.ObjectId;
}

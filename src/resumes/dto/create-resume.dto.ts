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
import mongoose from 'mongoose';

class ResumeHistoryDto {
  @IsString()
  status: string;

  @IsDate()
  @Type(() => Date)
  updateAt: Date;

  @ValidateNested()
  @Type(() => Object)
  updateBy: {
    _id: mongoose.Types.ObjectId;
    email: string;
  };
}

export class CreateResumeDto {
  @IsNotEmpty({ message: 'userId không được bỏ trống' })
  userId: mongoose.Schema.Types.ObjectId;

  @IsEmail()
  @IsNotEmpty({ message: 'userId không được bỏ trống' })
  email: string;

  @IsNotEmpty({ message: 'URL không được bỏ trống' })
  url?: string;

  @IsNotEmpty({ message: 'status không được bỏ trống' })
  status?: string;

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

import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsDate,
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

export class UpdateResumeDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResumeHistoryDto)
  history?: ResumeHistoryDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => Object)
  updateBy?: {
    _id: mongoose.Types.ObjectId;
    email: string;
  };

  @IsOptional()
  @ValidateNested()
  @Type(() => Object)
  deleteBy?: {
    _id: mongoose.Types.ObjectId;
    email: string;
  };

  @IsOptional()
  @IsBoolean()
  isDelete?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deleteAt?: Date;
}

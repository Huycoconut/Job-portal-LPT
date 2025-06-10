import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateSubcriberDto {
  @IsNotEmpty({ message: 'email không được để trống' })
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'name không được để trống' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Skill không được để trống' })
  @IsArray({ message: 'permission có định dạng là array' })
  @IsString()
  skills: string;
}

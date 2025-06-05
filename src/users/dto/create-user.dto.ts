//data transform object

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

//class = object
export class CreateUserDto {
  @IsEmail({}, { message: 'Chưa đúng định dạng Email' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  password: string;

  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Address không được để trống' })
  address: string;

  @IsNotEmpty({ message: 'age không được để trống' })
  ege: string;

  @IsNotEmpty({ message: 'Gender không được để trống' })
  gender: string;

  @IsNotEmpty({ message: 'Role không được để trống' })
  role: string;

  @IsNotEmpty({ message: 'Phone không được để trống' })
  phone: string;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Company)
  company: string;
}

export class RegisterUserDto {
  @IsEmail({}, { message: 'Chưa đúng định dạng Email' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  password: string;

  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Address không được để trống' })
  address: string;

  @IsNotEmpty({ message: 'age không được để trống' })
  age: string;

  @IsNotEmpty({ message: 'Gender không được để trống' })
  gender: string;

  @IsNotEmpty({ message: 'Phone không được để trống' })
  phone: string;

  @IsNotEmpty({ message: 'Gender không được để trống' })
  @IsMongoId({ message: 'Role có định dạng MogoId' })
  role: mongoose.Schema.Types.ObjectId;
}

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'username@gmail.com', description: 'username' })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: 'password' })
  readonly password: string;
}

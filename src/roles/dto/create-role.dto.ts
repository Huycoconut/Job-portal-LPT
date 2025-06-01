import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Module không được để trống' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'description không được để trống' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'isActive không được để trống' })
  @IsString()
  isActive: string;

  @IsNotEmpty({ message: 'permission không được để trống' })
  @IsMongoId({ each: true, message: 'each permissions là mongo object id' })
  @IsArray({ message: 'permission có định dạng là array' })
  permission: mongoose.Schema.Types.ObjectId[];
}

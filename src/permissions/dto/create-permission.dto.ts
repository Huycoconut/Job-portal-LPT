import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Api path không được để trống' })
  apiPath: string;

  @IsString()
  @IsNotEmpty({ message: 'method không được để trống' })
  method: string;

  @IsString()
  @IsNotEmpty({ message: 'Module không được để trống' })
  module: string;
}

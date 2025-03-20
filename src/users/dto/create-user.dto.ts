//data transform object

import { IsEmail, IsNotEmpty } from 'class-validator';

//class = object
export class CreateUserDto {
  @IsEmail({}, { message: 'Chưa đúng định dạng Email' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  password: string;

  name: string;
  address: string;
}

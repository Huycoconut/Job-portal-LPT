import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// eslint-disable-next-line prettier/prettier
//OmitType: bỏ đi, có nghĩa là bỏ đi 1 cái gì đó kh cần update
// ở đây ví dụ bỏ qua trường password
export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  _id: string;
}

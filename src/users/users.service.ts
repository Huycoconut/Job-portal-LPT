/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { bcrypt, hashSync } from 'bcrypt';
import { genSaltSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  //Thông báo là UsersService sẽ sử dụng model User đã được khai báo từ user.module
  constructor(
    // Model<User> là kiểu cho usermodel
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  hashPassword = (password: string) => {
    const saltRounds = genSaltSync(10);
    const hash = hashSync(password, saltRounds);
    return hash;
  };

  async create(creatUserDTO: CreateUserDto) {
    const hashPassword = this.hashPassword(creatUserDTO.password);
    const user = await this.userModel.create({
      email: creatUserDTO.email,
      password: hashPassword,
      name: creatUserDTO.name,
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

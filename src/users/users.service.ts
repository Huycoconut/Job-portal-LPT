/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { bcrypt, hashSync } from 'bcrypt';
import {  compareSync, genSaltSync } from 'bcryptjs';

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

  findOne(id: string) {
    try {
      return this.userModel.findOne({ _id: id });
    } catch (error) {
      return 'Not found user!';
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({
      id_: updateUserDto._id,
      ...updateUserDto,
    });
  }

  remove(id: string) {
    try {
      return this.userModel.deleteOne({ _id: id });
    } catch (error) {
      return 'Not found user!';
    }
  }

  findOneByUsername(username: string) {
    console.log('Username: ', username);
    return this.userModel.findOne({ email: username });
  }

  isValidPassword(password: string, hash: string) {
    console.log('Password nhập vào:', password);
    console.log('Password đã hash:', hash);
    return compareSync(password, hash);
  }
}

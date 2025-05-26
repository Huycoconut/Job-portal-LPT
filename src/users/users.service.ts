/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { bcrypt, hashSync } from 'bcrypt';
import { compareSync, genSaltSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { exit } from 'process';
import { IUser } from './user.interface';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  //Thông báo là UsersService sẽ sử dụng model User đã được khai báo từ user.module
  constructor(
    // Model<User> là kiểu cho usermodel
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
  ) {}

  hashPassword = (password: string) => {
    const saltRounds = genSaltSync(10);
    const hash = hashSync(password, saltRounds);
    return hash;
  };

  async create(creatUserDTO: CreateUserDto, user: IUser) {
    const hashPassword = await this.hashPassword(creatUserDTO.password); // nếu là async
    const exitUser = this.userModel.findOne({ email: creatUserDTO.email });

    if (exitUser) {
      throw new BadRequestException(
        `email :${(await exitUser).email} đã tồn tại`,
      );
    }
    {
      const newUser = await this.userModel.create({
        ...creatUserDTO,
        password: hashPassword,

        createBy: { _id: user._id, createBy: user.name },
      });

      return { _id: newUser.id, createdAt: newUser.createdAt };
    }
  }

  async register(user: RegisterUserDto) {
    const { name, email, password, ege, gender, address } = user;
    const hashPassword = await this.hashPassword(user.password);
    const exitUser = this.userModel.findOne({ email });

    if (exitUser) {
      throw new BadRequestException(`email :${email} đã tồn tại`);
    }
    return await this.userModel.create({
      name,
      email,
      password: hashPassword,
      ege,
      gender,
      address,
      role: 'USER',
    });
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);

    delete filter.page;
    delete filter.limit;

    const offset = (+currentPage - 1) * +limit;
    const defualtLimit = +limit ? +limit : 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defualtLimit);

    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(defualtLimit)
      .sort(sort as any)
      .select('-password')
      .populate(population)
      .exec();
    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  findOne(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return 'không tìm thấy người dùng';
      return this.userModel.findOne({ _id: id }).select('-password'); // - : exclude/include
    } catch (error) {
      return 'Not found user!';
    }
  }

  async update(updateUserDto: UpdateUserDto, user: IUser) {
    return await this.userModel.updateOne({
      id_: updateUserDto._id,
      ...updateUserDto,
      updateBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  remove(id: string) {
    try {
      return this.userModel.softDelete({ _id: id });
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

  updateUserToken = async (refeshToken: string, _id: string) => {
    return await this.userModel.updateOne({ _id }, { refeshToken });
  };
}

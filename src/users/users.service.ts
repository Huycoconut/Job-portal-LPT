/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { bcrypt, hashSync } from 'bcrypt';
import { compareSync, genSaltSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { exit } from 'process';
import { IUser } from './user.interface';
import aqp from 'api-query-params';
import { Role, RoleDocument } from 'src/roles/schema/role.schema';
import { USER_ROLE } from 'src/databases/sample';

@Injectable()
export class UsersService {
  //Thông báo là UsersService sẽ sử dụng model User đã được khai báo từ user.module
  constructor(
    // Model<User> là kiểu cho usermodel
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
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
    const { name, email, password, age, gender, address } = user;
    const hashPassword = await this.hashPassword(user.password);
    const exitUser = this.userModel.findOne({ email });

    if (exitUser) {
      throw new BadRequestException(`email :${email} đã tồn tại`);
    }

    //fetch user role
    const userRole = await this.roleModel.findOne({ name: USER_ROLE });
    return await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role: userRole?._id,
    });
  }

  async findAll(current: number, pageSize: number, qs: string) {
    const { filter, sort, population } = aqp(qs);

    delete filter.page;
    delete filter.pageSize;

    const offset = (+current - 1) * +pageSize;
    const defualtpageSize = +pageSize ? +pageSize : 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defualtpageSize);

    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(defualtpageSize)
      .sort(sort as any)
      .select('-password')
      .populate(population)
      .exec();
    return {
      meta: {
        current: current,
        pageSize: pageSize,
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
      return this.userModel
        .findOne({ _id: id })
        .select('-password')
        .populate({ path: 'role', select: { name: 1 } }); // - : exclude/include
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

  async remove(id: string, user: IUser) {
    //admin@gmail.com
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Không tìm thấy Id');
      }

      const foundUser = await this.userModel.findById(id);
      if (foundUser && foundUser.email === 'admin@gmail.com') {
        throw new BadRequestException('Không tìm thấy Id');
      }

      await this.userModel.updateOne(
        { _id: id },
        {
          $set: {
            _id: user._id,
            name: user.name,
          },
        },
      );

      return this.userModel.softDelete({ _id: id });
    } catch (error) {
      return 'Not found user!';
    }
  }

  findOneByUsername(username: string) {
    return this.userModel
      .findOne({ email: username })
      .populate({ path: 'role', select: { name: 1, permission: 1 } });
  }

  isValidPassword(password: string, hash: string) {
    console.log('Password nhập vào:', password);
    console.log('Password đã hash:', hash);
    return compareSync(password, hash);
  }

  updateUserToken = async (refreshToken: string, _id: string) => {
    return await this.userModel.updateOne({ _id }, { refreshToken });
  };

  findUserByToken(refreshToken: string) {
    return this.userModel
      .findOne({ refreshToken })
      .populate({ path: 'role', select: { name: 1 } });
  }
}

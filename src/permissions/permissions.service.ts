import { UpdateCompanyDto } from './../companies/dto/update-company.dto';
import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from './schema/permission.schema';
import { IUser } from 'src/users/user.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: SoftDeleteModel<PermissionDocument>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    const { apiPath, name, method, module } = createPermissionDto;

    const existing = await this.permissionModel.findOne({
      apiPath,
      method,
    });

    if (existing) {
      throw new BadRequestException('Quyền đã tồn tại');
    }

    await this.permissionModel.create({
      ...createPermissionDto,
      createBy: { _id: user._id, email: user.email },
      createdAt: new Date(),
    });

    return { _id: user._id, creatAt: new Date() };
  }

  async findAll(current: number, pageSize: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);

    delete filter.page;
    delete filter.pageSize;

    const offset = (+current - 1) * +pageSize;
    const defualtpageSize = +pageSize ? +pageSize : 10;

    const totalItems = (await this.permissionModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defualtpageSize);

    const result = await this.permissionModel
      .find(filter)
      .skip(offset)
      .limit(defualtpageSize)
      .sort(sort as any)
      .select(projection as any)
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

  async findOne(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id không tồn tại');
    }
    return await this.permissionModel.findOne({ _id: id });
  }

  update(id: string, user: IUser, updatePermissionDto: UpdatePermissionDto) {
    const { apiPath, name, method, module } = updatePermissionDto;

    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id không tồn tại');
    }
    const updateStatus = this.permissionModel.updateOne(
      { _id: id },
      {
        $set: {
          apiPath,
          name,
          method,
          module,
          updateBy: {
            _id: user._id,
            email: user.email,
          },
        },
      },
    );
    return updateStatus;
  }

  async remove(id: string, user: IUser) {
    try {
      await this.permissionModel.updateOne(
        { _id: id },
        {
          $set: {
            _id: user._id,
            name: user.name,
          },
        },
      );
      return this.permissionModel.softDelete({ _id: id });
    } catch (error) {
      return `phát sinh lỗi ${error}`;
    }
  }
}

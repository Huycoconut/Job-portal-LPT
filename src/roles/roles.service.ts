import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Role, RoleDocument } from './schema/role.schema';
import { IUser } from 'src/users/user.interface';
import mongoose, { isValidObjectId } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
  ) {}
  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const { name } = createRoleDto;
    const exitName = this.roleModel.findOne({ name });
    if (!exitName) {
      throw new BadRequestException('Name đã tồn tại');
    }

    const newRole = await this.roleModel.create({
      ...createRoleDto,
      createBy: { _id: user._id, email: user.email },
    });
    return { _id: newRole.id, createAt: new Date() };
  }

  async findAll(current: number, pageSize: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);

    delete filter.page;
    delete filter.pageSize;

    const offset = (+current - 1) * +pageSize;
    const defualtpageSize = +pageSize ? +pageSize : 10;

    const totalItems = (await this.roleModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defualtpageSize);

    const result = await this.roleModel
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

  findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Không tìm thấy Id');
    }
    //-1 không muốn chọn, 1 muốn chọn
    return this.roleModel.findOne({ _id: id }).populate({
      path: 'permission',
      select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 },
    });
  }

  update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    const { name, description, isActive, permission } = updateRoleDto;

    if (!isValidObjectId(id)) {
      throw new BadRequestException('Không tìm thấy Id');
    }

    const updateRole = this.roleModel.updateOne(
      { _id: id },
      {
        name,
        description,
        isActive,
        permission,
        updateBy: { _id: user._id, email: user.email },
      },
    );
    return updateRole;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Không tìm thấy Id');
    }

    if (!isValidObjectId(id)) {
      throw new BadRequestException('Không tìm thấy Id');
    }

    const foundUser = await this.roleModel.findById(id);

    if (foundUser.name === 'ADMIN') {
      throw new BadRequestException('Không tìm thấy Id');
    }

    const deleteRole = this.roleModel.softDelete({ _id: id });
    return deleteRole;
  }
}

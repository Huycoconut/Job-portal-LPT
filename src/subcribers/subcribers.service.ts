import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubcriberDto } from './dto/create-subcriber.dto';
import { UpdateSubcriberDto } from './dto/update-subcriber.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Subcriber, SubcriberDocument } from './schema/subcriber.schema';
import { IUser } from 'src/users/user.interface';
import { isValidObjectId } from 'mongoose';
import aqp from 'api-query-params';
import { ADMIN_ROLE } from 'src/databases/sample';

@Injectable()
export class SubcribersService {
  constructor(
    @InjectModel(Subcriber.name)
    private subcriberModel: SoftDeleteModel<SubcriberDocument>,
  ) {}
  async create(createSubcriberDto: CreateSubcriberDto, user: IUser) {
    const newSubcriber = await this.subcriberModel.create({
      ...createSubcriberDto,
      createBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return { _id: newSubcriber._id, createdAt: new Date() };
  }

  async findAll(current: number, pageSize: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);

    delete filter.page;
    delete filter.pageSize;

    const offset = (+current - 1) * +pageSize;
    const defualtpageSize = +pageSize ? +pageSize : 10;

    const totalItems = (await this.subcriberModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defualtpageSize);

    const result = await this.subcriberModel
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
    if (isValidObjectId(id)) {
      throw new BadRequestException('Id không hợp lệ, hãy thử lại');
    }

    const findSubcriber = await this.subcriberModel.findOne({ id });
    return findSubcriber;
  }

  update(updateSubcriberDto: UpdateSubcriberDto, user: IUser) {
    const { email, name, skills } = updateSubcriberDto;

    const updateSubcriber = this.subcriberModel.updateOne(
      { email: user.email },
      { ...updateSubcriberDto, updateBy: { _id: user._id, email: user.email } },
      //upsert: nếu bản ghi đã tồn tại thì update, chưa tồn tại thì insert
      //upsert = insert + update
      { upsert: true },
    );
    return updateSubcriber;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Không tìm thấy Id');
    }

    const deleteSubcriber = this.subcriberModel.softDelete({ _id: id });
    return deleteSubcriber;
  }

  async getSkills(user: IUser) {
    const { email } = user;
    return await this.subcriberModel.findOne({ email }, { skill: 1 });
  }
}

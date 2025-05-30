import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Resume, ResumeDocument } from './schema/resume.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/user.interface';
import aqp from 'api-query-params';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name)
    private resumeModel: SoftDeleteModel<ResumeDocument>,
  ) {}
  async create(createResumeCvDto: CreateUserCvDto, user: IUser) {
    const createResume = await this.resumeModel.create({
      ...createResumeCvDto,
      email: user.email,
      status: 'PENDING',
      userId: user._id,
      history: [
        {
          status: 'PENDING',
          updateAt: new Date(),
          updateBy: {
            _id: user._id,
            email: user.email,
          },
        },
      ],
      createBy: { _id: user._id, email: user.email },
    });
    return { _id: createResume.id, createAt: createResume.createdAt };
  }

  async findAll(current: number, pageSize: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);

    delete filter.page;
    delete filter.pageSize;

    const offset = (+current - 1) * +pageSize;
    const defualtpageSize = +pageSize ? +pageSize : 10;

    const totalItems = (await this.resumeModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defualtpageSize);

    const result = await this.resumeModel
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
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    const resume = await this.resumeModel.findOne({ _id: id });
    if (!resume) {
      throw new BadRequestException('Không tìm thấy');
    }
    return resume;
  }

  async update(id: string, status: string, user: IUser) {
    const updateStatus = await this.resumeModel.updateOne(
      { _id: id },
      {
        $set: {
          status,
          updateBy: {
            _id: user._id,
            email: user.email,
          },
        },
        //$push đẩy thêm data vào sau data cũ
        $push: {
          history: {
            status: status,
            updateAt: new Date(),
            updateBy: {
              _id: user._id,
              email: user.email,
            },
          },
        },
      },
    );
    return updateStatus;
  }

  async remove(id: string, user: IUser) {
    try {
      await this.resumeModel.updateOne(
        { _id: id },
        {
          $set: {
            _id: user._id,
            name: user.name,
          },
        },
      );
      return this.resumeModel.softDelete({ _id: id });
    } catch (error) {
      return `phát sinh lỗi ${error}`;
    }
  }

  async getCvByUser(user: IUser) {
    const getCv = this.resumeModel
      .find({ userId: user._id })
      .sort({ createdAt: -1 }); // sắp xếp mới nhất trước;

    return getCv;
  }
}

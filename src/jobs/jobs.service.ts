import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateJobDto } from './dto/update-job.dto';
import { CreateJobDto } from './dto/create-job.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Jobs, JobsDocument } from './schema/job.schema';
import { IUser } from 'src/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Jobs.name)
    private jobModel: SoftDeleteModel<JobsDocument>,
  ) {}
  async create(createJobDto: CreateJobDto, user: IUser) {
    const job = await this.jobModel.create({
      ...createJobDto,
      company: {
        _id: user._id,
        name: user.name,
      },
    });
    return {
      _id: job._id,
      createdAt: job.createdAt,
    };
  }

  async findAll(current: number, pageSize: number, qs: string) {
    const { filter, sort, population } = aqp(qs);

    delete filter.page;
    delete filter.pageSize;

    const offset = (+current - 1) * +pageSize;
    const defualtpageSize = +pageSize ? +pageSize : 10;

    const totalItems = (await this.jobModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defualtpageSize);

    const result = await this.jobModel
      .find(filter)
      .skip(offset)
      .limit(defualtpageSize)
      .sort(sort as any)
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

    const job = await this.jobModel.findOne({ _id: id });
    if (!job) {
      throw new BadRequestException('Không tìm thấy');
    }
    return job;
  }

  update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    const jobUpdate = this.jobModel.updateOne(
      { _id: id },
      {
        ...updateJobDto,
        updateBy: {
          _id: user._id,
          name: user.name,
        },
      },
    );
    return jobUpdate;
  }

  async remove(id: string, user: IUser) {
    try {
      await this.jobModel.updateOne(
        { _id: id },
        {
          $set: {
            _id: user._id,
            name: user.name,
          },
        },
      );
      return this.jobModel.softDelete({ _id: id });
    } catch (error) {
      return `phát sinh lỗi ${error}`;
    }
  }
}

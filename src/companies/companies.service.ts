import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { IUser } from 'src/users/user.interface';
import { use } from 'passport';
import aqp from 'api-query-params';
import { of } from 'rxjs';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}
  create(createCompanyDto: CreateCompanyDto, user: IUser) {
    return this.companyModel.create({
      ...createCompanyDto,
      createBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  async findAll(current: number, pageSize: number, qs: any) {
    const { filter, sort, population } = aqp(qs);

    console.log('Final filter for MongoDB:', filter);

    const offset = (+current - 1) * +pageSize;
    const defaultPageSize = +pageSize || 10;

    const totalItems = await this.companyModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / defaultPageSize);

    const result = await this.companyModel
      .find(filter)
      .skip(offset)
      .limit(defaultPageSize)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current,
        pageSize,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    const userUpdate = this.companyModel.updateOne(
      { _id: id },
      {
        ...updateCompanyDto,
        updateBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return userUpdate;
  }

  async remove(id: string, user: IUser) {
    try {
      await this.companyModel.updateOne(
        { _id: id },
        {
          $set: {
            deleteBy: {
              _id: user._id,
              email: user.email,
            },
          },
        },
      );

      return await this.companyModel.softDelete({ _id: id });
    } catch (e) {
      return `Phát sinh lỗi ${e}`;
    }
  }
}

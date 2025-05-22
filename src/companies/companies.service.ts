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

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);

    delete filter.page;
    delete filter.limit;

    const offset = (+currentPage - 1) * +limit;
    const defualtLimit = +limit ? +limit : 10;

    const totalItems = (await this.companyModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defualtLimit);

    const result = await this.companyModel
      .find(filter)
      .skip(offset)
      .limit(defualtLimit)
      .sort(sort as any)
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

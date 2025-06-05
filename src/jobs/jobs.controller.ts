import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ResponseMessage, User, Public } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards()
  @ResponseMessage('Create Job Success')
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  @Public()
  @Get()
  @ResponseMessage('Fetch List Jobs paginate')
  findAll(
    @Query('current') current: number,
    @Query('pageSize') pageSize: number,
    @Query() qs: any,
  ) {
    const queryParamsForAqp = { ...qs }; // Tạo một bản sao
    delete queryParamsForAqp.current; // Xóa current
    delete queryParamsForAqp.pageSize; // Xóa pageSize

    return this.jobsService.findAll(current, pageSize, queryParamsForAqp);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Fetch List a Jobs')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards()
  @ResponseMessage('Update Job Success')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser,
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}

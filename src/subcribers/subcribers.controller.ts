import { SkipCheckPermission } from './../decorator/customize';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubcribersService } from './subcribers.service';
import { CreateSubcriberDto } from './dto/create-subcriber.dto';
import { UpdateSubcriberDto } from './dto/update-subcriber.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { UpdateRoleDto } from 'src/roles/dto/update-role.dto';
import { IUser } from 'src/users/user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subcribers')
@Controller('subcribers')
export class SubcribersController {
  constructor(private readonly subcribersService: SubcribersService) {}

  @Post()
  create(@Body() createSubcriberDto: CreateSubcriberDto, @User() user: IUser) {
    return this.subcribersService.create(createSubcriberDto, user);
  }

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

    return this.subcribersService.findAll(current, pageSize, queryParamsForAqp);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcribersService.findOne(id);
  }

  @Patch()
  update(@Body() updateRoleDto: UpdateRoleDto, @User() user: IUser) {
    return this.subcribersService.update(updateRoleDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcribersService.remove(id);
  }

  @Post('skills')
  @ResponseMessage("Get subcriber's skills")
  @SkipCheckPermission()
  getUserSkills(@User() user: IUser) {
    return this.subcribersService.getSkills(user);
  }
}

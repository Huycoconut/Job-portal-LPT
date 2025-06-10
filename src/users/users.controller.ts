import { IUser } from 'src/users/user.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ResponseMessage('Create a new user')
  @Post()
  create(@Body() createDTO: CreateUserDto, @User() user: IUser) {
    return this.usersService.create(createDTO, user);
  }

  @Get()
  findAll(
    @Query('current') current: number,
    @Query('pageSize') pageSize: number,
    @Query() qs: any,
  ) {
    const queryParamsForAqp = { ...qs }; // Tạo một bản sao
    delete queryParamsForAqp.current; // Xóa current
    delete queryParamsForAqp.pageSize; // Xóa pageSize

    return this.usersService.findAll(current, pageSize, queryParamsForAqp);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ResponseMessage('Update a new user')
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return this.usersService.update(updateUserDto, user);
  }

  @ResponseMessage('Delete a new user')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }

  // @Get(':id')
  // findOneByUsername(username: string) {
  //   return this.usersService.findOneByUsername(username);
  // }
}

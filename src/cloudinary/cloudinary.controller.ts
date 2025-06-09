// app.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/decorator/customize';
import { IUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';

@ApiTags('image')
@Controller('image')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards()
  @Post('uploads')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImages(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
    @User() user: IUser,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const uploadResult = await this.cloudinaryService.uploadFile(file);

    updateUserDto.cv = uploadResult.secure_url || uploadResult.url;

    await this.userService.update(updateUserDto, user);

    return uploadResult;
  }
}

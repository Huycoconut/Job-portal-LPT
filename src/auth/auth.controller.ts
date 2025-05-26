import { Public, ResponseMessage } from './../decorator/customize';
import { ConfigService } from '@nestjs/config';
import {
  Controller,
  Get,
  Post,
  Render,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AppService } from 'src/app.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('User Login')
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //@UseGuards(JwtAuthGuard)
  @Public()
  @Get('profile')
  async getProfilea(@Request() req) {
    return req.user;
  }

  @Public()
  @ResponseMessage('Register a new user')
  @Post('register')
  register(@Body() createDTO: RegisterUserDto) {
    return this.authService.register(createDTO);
  }
}

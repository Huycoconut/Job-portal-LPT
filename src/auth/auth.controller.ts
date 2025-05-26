import { Public, ResponseMessage } from './../decorator/customize';
import { ConfigService } from '@nestjs/config';
import {
  Controller,
  Get,
  Post,
  Render,
  UseGuards,
  Body,
  Res,
  Req,
} from '@nestjs/common';
import { AppService } from 'src/app.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';

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
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  //@UseGuards(JwtAuthGuard)
  @Public()
  @Get('profile')
  async getProfilea(@Req() req) {
    return req.user;
  }

  @Public()
  @ResponseMessage('Register a new user')
  @Post('register')
  register(@Body() createDTO: RegisterUserDto) {
    return this.authService.register(createDTO);
  }

  // @Public()
  // @ResponseMessage('Get User by refresh token')
  // @Get('/refresh')
  // handleRefreshToken(@Req() req: Request) {
  //   const refreshToken = req.cookies['refresh_token'];
  //   return this.authService.processNewToken(refreshToken);
  // }
}

import { Public, ResponseMessage, User } from './../decorator/customize';
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
import { RegisterUserDto, UserLoginDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/user.interface';
import { RolesService } from 'src/roles/roles.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { MyThrottlerGuard } from './throttle/throttle.mess';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    //inject từ service này sang service khác phải import module vào service đó

    private authService: AuthService,
    private roleService: RolesService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  //rate limit 3 in 60s
  @Throttle({ default: { limit: 3, ttl: 30000 } })
  @UseGuards(MyThrottlerGuard)
  @ResponseMessage('User Login')
  @Post('login')
  @ApiBody({ type: UserLoginDto })
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @ResponseMessage('Get account infomation')
  @Get('/account')
  async handleGetAccount(@User() user: IUser) {
    const temp = (await this.roleService.findOne(user.role._id)) as any;
    user.permission = temp.permission;
    return { user };
  }

  @Public()
  @ResponseMessage('Register a new user')
  @Post('register')
  register(@Body() createDTO: RegisterUserDto) {
    return this.authService.register(createDTO);
  }

  @Public()
  @ResponseMessage('Get User by refresh token')
  @Get('refresh')
  handleRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];

    return this.authService.processNewToken(refreshToken, response);
  }

  @UseGuards(LocalAuthGuard)
  @Get('logout')
  async logOut(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser,
  ) {
    return this.authService.logout(response, user);
  }
}

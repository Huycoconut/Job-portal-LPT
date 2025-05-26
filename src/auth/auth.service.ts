import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { IUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
import ms from 'ms';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    private congfiService: ConfigService,
  ) {}
  //username va pass là 2 tham số thư viện passport trả về
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = await this.usersService.isValidPassword(
        pass,
        user.password,
      );

      if (isValid === true) {
        return user;
      }
    }
    return null;
  }

  async login(user: IUser, response: Response) {
    const { _id, name, email, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
      role,
    };
    const refresh_token = this.createRefreshToken(payload);
    //update user with refresh token
    await this.usersService.updateUserToken(refresh_token, _id);
    //set refresh_token as cookie
    const refreshExpire = this.congfiService.get(
      'JWT_REFRESH_EXPIRE',
    ) as ms.StringValue;

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: ms(refreshExpire),
    });
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
        role,
      },
    };
  }

  async register(user: RegisterUserDto) {
    let newUser = await this.usersService.register(user);
    newUser = null;
    return {
      _id: newUser?._id,
      createAt: newUser?.createdAt,
    };
  }

  createRefreshToken = (payload) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.congfiService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn:
        ms(this.congfiService.get('JWT_REFRESH_EXPIRE') as ms.StringValue) /
        1000,
    });

    return refresh_token;
  };

  // processNewToken = (refreshToken: string) => {
  //   try {
  //     this.jwtService.verify(refreshToken, {
  //       secret: this.congfiService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
  //     });
  //   } catch (error) {
  //     throw new BadRequestException(error);
  //   }

  //   return refreshToken;
  // };
}

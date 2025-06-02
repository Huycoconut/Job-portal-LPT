import { BadRequestException, Injectable, Res } from '@nestjs/common';
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
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    private congfiService: ConfigService,

    private roleService: RolesService,
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
        const userRole = user.role as unknown as { _id: string; name: string };
        const temp = await this.roleService.findOne(userRole._id);

        const roleClean = {
          _id: temp._id,
          name: temp.name,
        };

        const objUser = {
          ...user.toObject(),
          role: roleClean,
          permission: temp?.permission ?? [],
        };

        return objUser;
      }
    }
    return null;
  }

  async login(user: IUser, response: Response) {
    const { _id, name, email, role, permission } = user;
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
        permission,
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

  processNewToken = async (refreshToken: string, response: Response) => {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.congfiService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      //todo
      const user = await this.usersService.findUserByToken(refreshToken);
      if (user) {
        //update refresh_token
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

        response.clearCookie('refresh_token');
        //update user with refresh token
        await this.usersService.updateUserToken(refresh_token, _id.toString());
        //set refresh_token as cookie
        const refreshExpire = this.congfiService.get(
          'JWT_REFRESH_EXPIRE',
        ) as ms.StringValue;
        //fetch user role
        const userRole = user.role as unknown as { _id: string; name: string };
        const temp = await this.roleService.findOne(userRole._id);

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
            permission: temp?.permission ?? [],
          },
        };
      } else {
        throw new BadRequestException(
          `Refresh token không hợp lệ, vui lòng login!`,
        );
      }
    } catch (error) {
      throw new BadRequestException(
        `Refresh token không hợp lệ, vui lòng login `,
      );
    }
  };

  logout = async (reponse: Response, user: IUser) => {
    await this.usersService.updateUserToken('', user._id);
    reponse.clearCookie('refresh_token');
    return 'ok';
  };
}

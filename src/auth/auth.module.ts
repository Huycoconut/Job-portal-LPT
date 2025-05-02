import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport/jwt.strategy';
import ms from 'ms';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log('JWT_SECRET:', configService.get<string>('JWT_SECRET')); // Debug

        return {
          secret: configService.get<string>('JWT_ACCESS_TOKEN'),
          signOptions: {
            expiresIn: ms(configService.get('JWT_ACCESS_EXPIRE')),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

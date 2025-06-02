import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Role, RoleSchema } from 'src/roles/schema/role.schema';
import { RolesService } from 'src/roles/roles.service';

@Module({
  //name: User.name giống như một cái ID định danh cho module hiện tại
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  controllers: [UsersController],
  providers: [UsersService, RolesService],
  exports: [UsersService],
})
export class UsersModule {}

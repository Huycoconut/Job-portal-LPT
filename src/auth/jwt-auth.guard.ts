import { Request } from 'express';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    // You can throw an exception based on either "info" or "err" arguments
    const request: Request = context.switchToHttp().getRequest();
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'Token không hợp lệ or không có token berar ở header',
        )
      );
    }

    //check permissions
    const targetMethod = request.method; // ví dụ: GET, POST
    const targetEndpoint = request.route?.path; // ví dụ: /users

    const permissions = user?.permission ?? []; // danh sách quyền được cấp
    const isExist = permissions.find(
      // So sánh method và apipath của request với từng permission
      // Nếu không có permission khớp → ném lỗi ForbiddenException
      (permissions) =>
        targetMethod === permissions.method &&
        targetEndpoint === permissions.apipath,
    );

    if (!isExist) {
      throw new ForbiddenException('Bạn không có quyền để truy cập API này ');
    }
    return user;
  }
}

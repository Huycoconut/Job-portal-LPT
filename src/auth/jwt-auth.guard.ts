import { Request } from 'express';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSION } from 'src/decorator/customize';

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

  //check permissions
  handleRequest(err, user, info, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const isSkipPermission = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_PERMISSION,
      [context.getHandler(), context.getClass()],
    );

    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException('Token không hợp lệ hoặc không có token')
      );
    }

    const targetMethod = request.method; // ví dụ: GET, POST
    const targetEndpoint = request.baseUrl + request.route.path; // ví dụ: /users

    const permissions = user?.permission ?? []; // danh sách quyền được cấp
    // So sánh method và apipath của request với từng permission
    // Nếu không có permission khớp → ném lỗi ForbiddenException
    const isExist = permissions.find(
      (p) =>
        p.method === targetMethod &&
        '/' + p.apiPath.replace(/^\/+/, '') === targetEndpoint,
    );

    // if (
    //   !isExist &&
    //   !targetEndpoint.startsWith('/api/v1/auth') &&
    //   !isSkipPermission
    // ) {
    //   throw new ForbiddenException('Bạn không có quyền để truy cập API này');
    // }

    return user;
  }
}

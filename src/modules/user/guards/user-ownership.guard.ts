import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '../enums/user-type.enum';

@Injectable()
export class UserOwnershipGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user is attached to request by auth guard
    const userId = request.params.id;

    // Allow if user is admin or accessing their own data
    if (user.userType == UserType.INSTITUTE_ADMIN || user.id === userId) {
      return true;
    }

    throw new ForbiddenException('You can only access your own data');
  }
}


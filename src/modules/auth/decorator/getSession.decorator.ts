import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetSession = createParamDecorator(
  (data: { id?: boolean }, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (data.id) return request.sessionID;

    return request.session;
  },
);

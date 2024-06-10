import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DeviceMetadata as DeviceMetadataType } from '@/shared/interfaces/DeviceMetadata';
import { Request } from 'express';
import * as geoip from 'geoip-lite';

export const DeviceMetadata = createParamDecorator(
  (data: string, ctx: ExecutionContext): DeviceMetadataType => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return {
      device: request.headers['user-agent'],
      os: request.headers['user-agent'],
      ip: request.ip,
      location: geoip.lookup(request.ip)?.country || undefined,
    };
  },
);

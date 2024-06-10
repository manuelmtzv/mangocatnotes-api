import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SessionDataWithPassport } from './interfaces/SessionDataWithPassport';
import { Request } from 'express';
import { Redis } from 'ioredis';
import { ActiveSession } from './interfaces/ActiveSession';
import { sessionDataToActiveSession } from './mappers/session.mappers';
import { DeviceMetadata } from '@/shared/interfaces/DeviceMetadata';
import { Session } from 'express-session';

@Injectable()
export class SessionService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async findAll(userId: string, req: Request) {
    const activeSessions: ActiveSession[] = [];

    await req.sessionStore.all((err, sessions) => {
      if (err) {
        throw new InternalServerErrorException();
      }

      Array.isArray(sessions) &&
        sessions.forEach((session: SessionDataWithPassport) => {
          if (session.passport.user.id === userId) {
            activeSessions.push(sessionDataToActiveSession(session));
          }
        });
    });

    return activeSessions;
  }

  async attachDeviceMetadata(request: Request, deviceMetadata: DeviceMetadata) {
    (request.session as Session & SessionDataWithPassport).deviceMetadata =
      deviceMetadata;

    request.session.save();
  }

  async destroySession(sessionId: string) {
    return this.redis.del(sessionId);
  }
}

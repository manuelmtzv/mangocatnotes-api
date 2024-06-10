import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { SessionSerializer } from './serializers/session.serializer';
import { RedisModule } from '@nestjs-modules/ioredis';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    RedisModule,
    UserModule,
    SessionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { NoteModule } from './modules/note/note.module';
import { TagModule } from './modules/tag/tag.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { SessionModule } from './modules/session/session.module';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        url: config.getOrThrow('REDIS_URL'),
        type: 'single',
        options: {
          password: config.getOrThrow('REDIS_PASSWORD'),
        },
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    NoteModule,
    PrismaModule,
    TagModule,
    AuthModule,
    SessionModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { NoteModule } from './modules/note/note.module';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    NoteModule,
    PrismaModule,
    TagModule,
  ],
})
export class AppModule {}

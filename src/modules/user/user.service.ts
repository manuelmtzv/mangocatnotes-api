import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FindOneConfig } from '@src/shared/types/services';
import { isMongoId } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getMe(user: User) {
    delete user.hash;

    return user;
  }

  findOne(
    identifier: string,
    config: FindOneConfig = {},
  ): Promise<User | null> {
    const query = isMongoId(identifier)
      ? { id: identifier }
      : {
          OR: [{ email: identifier }, { username: identifier }],
        };

    const user = this.prisma.user.findFirst({
      where: query,
    });

    if (!user) {
      if (config.failOnNull) {
        throw new Error('User not found');
      }
      return null;
    }

    return user;
  }
}

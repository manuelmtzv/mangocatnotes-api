import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as argon from 'argon2';
import { omit } from 'rambda';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '@modules/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email, { failOnNull: false });

    if (!user) throw new ForbiddenException('Invalid identifier or password');
    const passwordValid = await argon.verify(user.hash, password);

    if (!passwordValid)
      throw new ForbiddenException('Invalid identifier or password');
    delete user.hash;

    return user;
  }

  async register(dto: RegisterDto) {
    if (await this.prisma.user.findFirst({ where: { email: dto.email } }))
      throw new BadRequestException('Email already exists');

    if (await this.prisma.user.findFirst({ where: { username: dto.username } }))
      throw new BadRequestException('Username already exists');

    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...omit(['password'], dto),
          hash,
        },
      });

      delete user.hash;
      return { username: user.username, email: user.email };
    } catch (err) {
      throw err;
    }
  }

  async login(user: User) {
    return { username: user.username, email: user.email };
  }

  async validateToken(user: User) {
    return { username: user.username, email: user.email };
  }
}

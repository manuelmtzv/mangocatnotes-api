import { UserService } from '@/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';

type UserSerialized = { id: string };

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: UserSerialized) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser(
    payload: UserSerialized,
    done: (err: Error, payload: User) => void,
  ) {
    const user = await this.userService.findOne(payload.id);

    done(null, user);
  }
}

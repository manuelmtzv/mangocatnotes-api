import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@modules/auth/guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe() {
    return 'Your user data';
  }
}

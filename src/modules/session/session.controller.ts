import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { SessionAuthGuard } from '@/modules/auth/guard/session.guard';
import { GetUser } from '@/modules/auth/decorator';
import { SessionService } from './session.service';

@Controller('session')
@UseGuards(SessionAuthGuard)
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async findAll(@GetUser('id') userId: string, @Req() req: Request) {
    return await this.sessionService.findAll(userId, req);
  }
}

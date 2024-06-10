import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guard';
import { GetUser } from './decorator';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { DeviceMetadata } from '@/shared/decorators/deviceMetadata.decorator';
import { DeviceMetadata as DeviceMetadataType } from '@/shared/interfaces/DeviceMetadata';
import { SessionService } from '@/modules/session/session.service';
import { SessionAuthGuard } from './guard/session.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @UseGuards(SessionAuthGuard)
  @Get('validate-token')
  validateToken(@GetUser() user: User) {
    return this.authService.validateToken(user);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @GetUser() user: User,
    @Req() req: Request,
    @DeviceMetadata() deviceMetadata: DeviceMetadataType,
  ) {
    await this.sessionService.attachDeviceMetadata(req, deviceMetadata);

    return await this.authService.login(user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(@Req() req: Request) {
    await this.authService.logout(req);
  }
}

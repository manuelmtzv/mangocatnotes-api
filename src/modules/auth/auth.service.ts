import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async validateToken() {
    return 'Hi';
  }

  async register(dto: RegisterDto) {
    return dto;
  }

  async login(dto: LoginDto) {
    return dto;
  }
}

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'example@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'Password123%' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ example: 'Name' })
  @IsString()
  @IsOptional()
  name?: string;
}

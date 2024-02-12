import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterNotesDto {
  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: string;

  @ApiPropertyOptional({ example: 'Lorem ipsum' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: ['tag1', 'tag2'] })
  @IsOptional()
  @IsArray()
  tags?: string[];
}

import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FilterNotesDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { GetUser } from '../auth/decorator';
import { CreateTagDto } from './dto/CreateTagDto';
import { UpdateTagDto } from './dto/UpdateTag';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getTags(@GetUser('id') userId: string) {
    return this.tagService.getTags(userId);
  }

  @Get(':id')
  getTag(@GetUser('id') userId: string, @Param('id') tagId: string) {
    return this.tagService.getTag(userId, tagId);
  }

  @Post()
  createTag(@GetUser('id') userId: string, @Body() dto: CreateTagDto) {
    return this.tagService.createTag(userId, dto);
  }

  @Patch(':id')
  updateTag(
    @GetUser('id') userId: string,
    @Param('id') tagId: string,
    @Body() dto: UpdateTagDto,
  ) {
    return this.tagService.updateTag(userId, tagId, dto);
  }

  @Delete(':id')
  deleteTag(@GetUser('id') userId: string, @Param('id') tagId: string) {
    return this.tagService.deleteTag(userId, tagId);
  }
}

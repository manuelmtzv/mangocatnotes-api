import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/CreateTagDto';
import { UpdateTagDto } from './dto/UpdateTag';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async getTags(userId: string) {
    const tags = await this.prisma.tag.findMany({ where: { userId } });

    return {
      data: tags,
      count: tags.length,
    };
  }

  async getTag(userId: string, tagId: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { id: tagId, userId },
    });

    if (!tag) throw new NotFoundException('Tag with provided id was not found');
    return tag;
  }

  async createTag(userId: string, dto: CreateTagDto) {
    const tag = this.prisma.tag.create({
      data: {
        ...dto,
        userId,
      },
    });

    return tag;
  }

  async updateTag(userId: string, tagId: string, dto: UpdateTagDto) {
    const tag = await this.prisma.tag.findUnique({
      where: { id: tagId, userId },
    });

    if (!tag) throw new NotFoundException('Tag with provided id was not found');

    const updatedTag = this.prisma.tag.update({
      where: { id: tagId, userId },
      data: dto,
    });

    return updatedTag;
  }

  async deleteTag(userId: string, tagId: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { id: tagId, userId },
    });

    if (!tag) throw new NotFoundException('Tag with provided id was not found');

    await this.prisma.tag.delete({ where: { id: tagId } });
  }
}

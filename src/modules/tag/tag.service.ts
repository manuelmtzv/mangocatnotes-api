import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const userTags = await this.prisma.tag.findMany({ where: { userId } });

    // TODO: Think about a better way to handle this, considering the frontend and business logic. For now, I'm going to restrict it to 10 tags.
    if (userTags.length >= 10) {
      throw new BadRequestException('You can only have 10 tags');
    }

    for (const tag of userTags) {
      if (tag.name === dto.name) {
        throw new BadRequestException('Tag with provided name already exists');
      }
    }

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

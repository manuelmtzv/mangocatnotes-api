import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';

@Injectable()
export class NoteTagService {
  constructor(private prisma: PrismaService) {}

  async getNoteTags(userId: string, noteId: string) {
    return this.prisma.tag.findMany({
      where: { notes: { some: { id: noteId } } },
    });
  }

  async attachTag(userId: string, noteId: string, tagId: string) {
    const note = await this.prisma.note.findUnique({
      where: { id: noteId, userId },
    });

    if (!note)
      return new NotFoundException('Note with provided id was not found');

    return this.prisma.note.update({
      where: { id: noteId, userId },
      data: {
        tags: {
          connect: { id: tagId },
        },
      },
    });
  }

  async detachTag(userId: string, noteId: string, tagId: string) {
    const note = await this.prisma.note.findUnique({
      where: { id: noteId, userId },
    });

    if (!note)
      return new NotFoundException('Note with provided id was not found');

    return this.prisma.note.update({
      where: { id: noteId, userId },
      data: {
        tags: {
          disconnect: { id: tagId },
        },
      },
    });
  }
}

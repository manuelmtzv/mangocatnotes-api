import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { CreateNoteDto, PaginateNotesDto } from './dto';
import { UpdateNoteDto } from './dto/updateNote.dto';
import { paginate } from '@src/shared/utils/paginate';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async getNotes(userId: string, dto: PaginateNotesDto) {
    const { page = 1, limit = 10, search, tags } = dto;

    const noteCount = (
      await this.prisma.note.findMany({
        where: { userId },
      })
    ).length;

    const pagination = paginate({ count: noteCount, page, limit });

    const notes = await this.prisma.note.findMany({
      where: {
        userId,
        title: search && { contains: search },
        tags: tags && {
          some: {
            name: { in: tags },
          },
        },
      },
      ...pagination.config(),
    });

    return {
      data: notes,
      meta: {
        page,
        limit,
        count: notes.length,
        totalPages: pagination.maxPage,
      },
    };
  }

  async getNote(userId: string, noteId: string) {
    const note = await this.prisma.note.findUnique({
      where: { id: noteId, userId },
    });

    if (!note)
      throw new NotFoundException('Note with provided id was not found');
    return note;
  }

  async createNote(userId: string, dto: CreateNoteDto) {
    const note = this.prisma.note.create({
      data: {
        ...dto,
        userId,
      },
    });

    return note;
  }

  async updateNote(userId: string, noteId: string, dto: UpdateNoteDto) {
    const note = await this.prisma.note.findUnique({
      where: { id: noteId, userId },
    });

    if (!note)
      throw new NotFoundException(`Note with provided id was not found`);

    const updatedNote = await this.prisma.note.update({
      where: { id: noteId },
      data: dto,
    });

    return updatedNote;
  }

  async deleteNote(userId: string, noteId: string) {
    const note = await this.prisma.note.findUnique({
      where: { id: noteId, userId },
    });

    if (!note)
      throw new NotFoundException(`Note with provided id was not found`);

    return this.prisma.note.delete({ where: { id: noteId } });
  }
}

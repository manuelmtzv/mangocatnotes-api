import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { CreateNoteDto, FilterNotesDto } from './dto';
import { UpdateNoteDto } from './dto/updateNote.dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async getNotes(userId: string, dto: FilterNotesDto) {
    const noteCount = (
      await this.prisma.note.findMany({
        where: { userId },
      })
    ).length;
    const maxPages = Math.ceil(noteCount / 10);
    const { page = 1 } = dto;

    const filterCount = Object.keys(dto).length;

    if ((filterCount === 1 && !('page' in dto)) || filterCount > 1) {
      return this.getFilteredNotes(userId, dto, noteCount);
    }

    if (page > maxPages) {
      return {
        data: [],
        count: 0,
      };
    }

    const notes = await this.prisma.note.findMany({
      where: { userId },
      include: { tags: true },
      take: 10,
      skip: (page - 1) * 10,
    });

    return {
      data: notes,
      count: notes.length,
      currentPage: page,
      maxPages,
    };
  }

  async getFilteredNotes(
    userId: string,
    dto: FilterNotesDto,
    noteCount: number,
  ) {
    const { limit = 10, page = 1, search, tags } = dto;
    const maxPages = Math.ceil(noteCount / limit);
    const filtersPresent = search || tags;

    if (page > maxPages) {
      return {
        data: [],
        count: 0,
      };
    }

    const notes = await this.prisma.note.findMany({
      where: {
        userId,
        OR: filtersPresent && [
          {
            tags: {
              some: {
                name: {
                  in: tags,
                  mode: 'insensitive',
                },
              },
            },
          },
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: { tags: true },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: notes,
      count: notes.length,
      currentPage: page,
      maxPages,
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

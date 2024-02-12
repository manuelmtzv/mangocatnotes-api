import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { CreateNoteDto, FilterNotesDto } from './dto';
import { UpdateNoteDto } from './dto/updateNote.dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async getNotes(userId: string) {
    const notes = await this.prisma.note.findMany({
      where: { userId },
      include: { tags: true },
    });

    return {
      data: notes,
      count: notes.length,
    };
  }

  async getFilteredNotes(userId: string, dto: FilterNotesDto) {
    const { limit, search, tags } = dto;

    const notes = await this.prisma.note.findMany({
      where: {
        userId,
        OR: [
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
      take: Number(limit) || undefined,
    });

    return {
      data: notes,
      count: notes.length,
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

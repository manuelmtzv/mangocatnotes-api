import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { CreateNoteDto } from './dto';
import { UpdateNoteDto } from './dto/updateNote.dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async getNotes(userId: string) {
    const notes = await this.prisma.note.findMany({ where: { userId } });

    return notes;
  }

  async getNote(noteId: string) {
    const note = await this.prisma.note.findUnique({ where: { id: noteId } });

    if (!note)
      throw new NotFoundException(`Note with provided id was not found`);

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

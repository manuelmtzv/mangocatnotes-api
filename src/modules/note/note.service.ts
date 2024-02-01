import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async getNotes() {
    return this.prisma.note.findMany();
  }

  async createNote() {
    // return this.prisma.note.create({ data: dto });
  }
}

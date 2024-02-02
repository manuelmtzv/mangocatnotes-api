import { Body, Controller, Get, Post } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  getNotes() {
    return this.noteService.getNotes();
  }

  @Post()
  createNote(@Body() dto: CreateNoteDto) {
    return dto;
  }
}

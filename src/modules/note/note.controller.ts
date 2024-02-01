import { Body, Controller, Post } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  getNotes(@Body() dto: CreateNoteDto) {
    return dto;
  }
}

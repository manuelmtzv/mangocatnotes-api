import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto';
import { IsObjectIdPipe } from '@src/pipes/mongoId/isObjectId.pipe';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UpdateNoteDto } from './dto/updateNote.dto';

@UseGuards(JwtGuard)
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  getNotes(@GetUser('id') userId: string) {
    return this.noteService.getNotes(userId);
  }

  @Get(':id')
  getNote(@Param('id', IsObjectIdPipe) noteId: string) {
    return this.noteService.getNote(noteId);
  }

  @Post()
  createNote(@GetUser('id') userId: string, @Body() dto: CreateNoteDto) {
    return this.noteService.createNote(userId, dto);
  }

  @Patch(':id')
  updateNote(
    @GetUser('id') userId: string,
    @Param('id', IsObjectIdPipe) noteId: string,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.noteService.updateNote(userId, noteId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteNote(
    @GetUser('id') userId: string,
    @Param('id', IsObjectIdPipe) noteId: string,
  ) {
    return this.noteService.deleteNote(userId, noteId);
  }
}

import {
  UseGuards,
  Controller,
  Param,
  Get,
  Post,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from '@src/modules/auth/guard';
import { NoteTagService } from './noteTag.service';
import { NoteService } from '../note.service';
import { IsObjectIdPipe } from '@src/pipes/mongoId/isObjectId.pipe';
import { GetUser } from '@src/modules/auth/decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Notes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtGuard)
@Controller('notes')
export class NoteTagController {
  constructor(
    private readonly noteService: NoteService,
    private readonly noteTagService: NoteTagService,
  ) {}

  @Get(':noteId/tags')
  getNoteTags(
    @GetUser('id') userId: string,
    @Param('noteId', IsObjectIdPipe) noteId: string,
  ) {
    return this.noteTagService.getNoteTags(userId, noteId);
  }

  @Post(':noteId/tags/:tagId')
  attachTag(
    @GetUser('id') userId: string,
    @Param('noteId', IsObjectIdPipe) noteId: string,
    @Param('tagId', IsObjectIdPipe) tagId: string,
  ) {
    return this.noteTagService.attachTag(userId, noteId, tagId);
  }

  @Delete(':noteId/tags/:tagId')
  detachTag(
    @GetUser('id') userId: string,
    @Param('noteId', IsObjectIdPipe) noteId: string,
    @Param('tagId', IsObjectIdPipe) tagId: string,
  ) {
    return this.noteTagService.detachTag(userId, noteId, tagId);
  }
}

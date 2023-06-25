import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';
import { TagDto } from './dto/tag.dao';
import { TagPatchDto } from './dto/tag-patch.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Get()
  getAll(): Promise<Tag[]> {
    return this.tagsService.getAll();
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return this.tagsService.getId(id);
  }

  @Post()
  async create(@Body() body: TagDto): Promise<Tag> {
    return this.tagsService.insert(body);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: TagDto) {
    return this.tagsService.update(id, body);
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: TagPatchDto,
  ) {
    return this.tagsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }
}

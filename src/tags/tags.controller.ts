import { Controller, Get, Param } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Get()
  getAll(): Tag[] {
    return this.tagsService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    console.log(id, typeof id);
    return 1;
  }
}

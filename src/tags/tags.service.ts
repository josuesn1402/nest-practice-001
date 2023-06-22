import { Injectable } from '@nestjs/common';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  private tags: Tag[] = [
    {
      id: 1,
      name: 'Muebles',
      slug: 'muebles',
    },
    {
      id: 2,
      name: 'Accesorios',
      slug: 'accesorios',
    },
  ];

  getAll(): Tag[] {
    return this.tags;
  }
}

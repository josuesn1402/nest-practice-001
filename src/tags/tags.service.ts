import { Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagDto } from './dto/tag.dao';
import { TagPatchDto } from './dto/tag-patch.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

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

  async getAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async getId(id: number): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({ where: { id } });
    if (tag) {
      return tag;
    }
    throw new NotFoundException(`No  puedo encontrar ese tag`);
  }

  async insert(body: TagDto): Promise<Tag> {
    const tag = this.tagsRepository.create(body);
    await this.tagsRepository.save(tag);
    return tag;
  }

  async update(id: number, body: TagDto | TagPatchDto): Promise<Tag> {
    const inputTag = {
      id,
      ...body,
    };
    const tag = await this.tagsRepository.preload(inputTag);
    if (tag) {
      return this.tagsRepository.save(tag);
    }
    throw new NotFoundException(`No he encontrado el tag con id ${id}`);
  }

  async delete(id: number): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({ where: { id } });
    if (tag) {
      await this.tagsRepository.remove(tag);
      return;
    }
    throw new NotFoundException(`No he encontrado el tag con id ${id}`);
  }
}

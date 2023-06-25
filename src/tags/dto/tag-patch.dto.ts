import { PartialType } from '@nestjs/mapped-types';
import { TagDto } from './tag.dao';

export class TagPatchDto extends PartialType(TagDto) {}

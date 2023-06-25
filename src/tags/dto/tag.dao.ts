import { IsString } from 'class-validator';

export class TagDto {
  @IsString({ message: 'El nombre se ha de indicar' })
  name: string;

  @IsString({ message: 'El slug se ha de indicar' })
  slug: string;
}

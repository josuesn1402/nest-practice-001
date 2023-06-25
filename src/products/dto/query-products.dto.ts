import { IsInt, IsString, Length, Matches, Max } from 'class-validator';

export class QueryProductDto {
  @IsString()
  @Length(1, 25)
  query: string;

  @IsInt()
  @Max(100)
  limit: number;

  @IsString()
  @Matches(/^(stock|name)$/)
  order: string;
}

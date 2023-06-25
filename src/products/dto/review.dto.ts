import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class ReviewDto {
  @IsString()
  @Length(2, 50)
  userName: string;

  @IsString()
  @Length(2, 50)
  review: string;

  @IsInt()
  @Min(1)
  @Max(5)
  valoration: number;
}

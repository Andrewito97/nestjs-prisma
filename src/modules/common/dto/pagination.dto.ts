import { Expose, Transform, Type } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';

export class PaginationDto {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  page: number = 1;

  @Min(1)
  @IsInt()
  @Type(() => Number)
  pageSize: number = 10;

  @Expose()
  @IsDefined()
  @Transform(({ obj }) => obj.pageSize * (obj.page - 1))
  skip: number;

  @Expose()
  @IsDefined()
  @Transform(({ obj }) => Number(obj.pageSize))
  take: number;
}

import { IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';

export class GetCommentsDto extends PaginationDto {
  @IsUUID(4)
  @IsOptional()
  authorId?: string;

  @IsUUID(4)
  @IsOptional()
  postId?: string;
}

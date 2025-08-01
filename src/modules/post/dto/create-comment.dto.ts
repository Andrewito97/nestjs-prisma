import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsUUID(4)
  authorId: string;

  @IsString()
  text: string;
}

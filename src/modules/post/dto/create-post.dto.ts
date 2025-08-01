import { IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsUUID(4)
  authorId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}

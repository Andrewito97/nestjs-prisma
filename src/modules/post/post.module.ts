import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './post.controller';
import { UserModule } from '../user/user.module';
import { CommentService } from './services/comment.service';
import { TagService } from './services/tag.service';

@Module({
  imports: [UserModule],
  controllers: [PostController],
  providers: [PostService, CommentService, TagService],
  exports: [],
})
export class PostModule {}

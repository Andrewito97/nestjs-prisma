import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './services/post.service';
import { IdParamDto } from '../common/dto/id-param.dto';
import { Comment, Post as PostEntity } from '@prisma/client';
import { GetPostsDto } from './dto/get-posts.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from '../user/user.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './services/comment.service';
import { GetCommentsDto } from './dto/get-comments.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './services/tag.service';

@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private tagService: TagService,
  ) {}

  @Get()
  async getPaginatedPosts(
    @Query() data: GetPostsDto,
  ): Promise<{ posts: PostEntity[]; total: number }> {
    const posts = await this.postService.getPosts(data);
    const total = await this.postService.countPosts(data.authorId);

    return { posts, total };
  }

  @Get(':id')
  async getPost(@Param() { id }: IdParamDto): Promise<PostEntity> {
    const post = await this.postService.getPostById(id);

    if (!post) {
      throw new NotFoundException('Post is not found');
    }

    return post;
  }

  @Post()
  async createPost(@Body() data: CreatePostDto): Promise<void> {
    const author = await this.userService.getUserById(data.authorId);

    if (!author) {
      throw new NotFoundException('Author is not found');
    }

    await this.postService.createPost(data);
  }

  @Patch(':id')
  async updatePost(
    @Param() { id }: IdParamDto,
    @Body() data: UpdatePostDto,
  ): Promise<void> {
    const user = await this.postService.getPostById(id);

    if (!user) {
      throw new NotFoundException('Post is not found');
    }

    await this.postService.updatePost(id, data);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: IdParamDto): Promise<void> {
    const post = await this.postService.getPostById(id);

    if (!post) {
      throw new NotFoundException('Post is not found');
    }

    await this.postService.deletePost(id);
  }

  @Post(':id/comments')
  async createComment(
    @Param() { id }: IdParamDto,
    @Body() data: CreateCommentDto,
  ): Promise<void> {
    const post = await this.postService.getPostById(id);

    if (!post) {
      throw new NotFoundException('Post is not found');
    }

    const author = await this.userService.getUserById(data.authorId);

    if (!author) {
      throw new NotFoundException('Author is not found');
    }

    await this.commentService.createComment({ postId: id, ...data });
  }

  @Get(':id/comments')
  async getPaginatedComments(
    @Query() data: GetCommentsDto,
  ): Promise<{ comments: Comment[]; total: number }> {
    const comments = await this.commentService.getComments(data);
    const total = await this.commentService.countComments(data);

    return { comments, total };
  }

  @Post(':id/tags')
  async addTagToPost(
    @Param() { id: postId }: IdParamDto,
    @Body() { text }: CreateTagDto,
  ): Promise<void> {
    const post = await this.postService.getPostById(postId);

    if (!post) {
      throw new NotFoundException('Post is not found');
    }

    let tag = await this.tagService.getTagByText(text);

    if (!tag) {
      await this.tagService.createTag({ text });
      tag = await this.tagService.getTagByText(text);
    }

    const isTagAssigned = post.tags.some(({ tagId }) => tagId === tag.id);

    if (!isTagAssigned) {
      await this.postService.assignTagToPost({ postId, tagId: tag.id });
    }
  }
}

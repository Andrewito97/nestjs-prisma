import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { GetPostsDto } from '../dto/get-posts.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async countPosts(authorId?: string) {
    return this.prisma.post.count({ where: { authorId } });
  }

  async getPosts({ authorId, take, skip }: GetPostsDto) {
    return this.prisma.post.findMany({
      where: { authorId },
      take,
      skip,
    });
  }

  async getPostById(id: string) {
    return this.prisma.post.findFirst({
      where: { id },
      include: {
        author: true,
        comments: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async createPost(data: CreatePostDto) {
    await this.prisma.post.create({ data });
  }

  async updatePost(id: string, data: UpdatePostDto) {
    await this.prisma.post.update({ where: { id }, data });
  }

  async deletePost(id: string) {
    await this.prisma.post.delete({ where: { id } });
  }

  async assignTagToPost(data: { tagId: string; postId: string }) {
    await this.prisma.postTag.create({ data });
  }
}

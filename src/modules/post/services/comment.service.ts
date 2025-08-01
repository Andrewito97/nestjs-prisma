import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { GetCommentsDto } from '../dto/get-comments.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async countComments(opts: { authorId?: string; postId?: string }) {
    return this.prisma.comment.count({ where: opts });
  }

  async getComments({ postId, authorId, take, skip }: GetCommentsDto) {
    return this.prisma.comment.findMany({
      where: { authorId, postId },
      take,
      skip,
    });
  }

  async createComment(data: CreateCommentDto & { postId: string }) {
    await this.prisma.comment.create({ data });
  }

  async updateComment(id: string, data: UpdateCommentDto) {
    await this.prisma.comment.update({ where: { id }, data });
  }

  async deleteComment(id: string) {
    await this.prisma.comment.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTagDto } from '../dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async createTag(data: CreateTagDto) {
    await this.prisma.tag.create({ data });
  }

  async getTagByText(text: string) {
    return this.prisma.tag.findFirst({ where: { text } });
  }
}

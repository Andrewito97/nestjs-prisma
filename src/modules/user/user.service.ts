import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async countUsers() {
    return this.prisma.user.count();
  }

  async getUsers({ take, skip }: PaginationDto) {
    return this.prisma.user.findMany({ take, skip });
  }

  async getUserById(id: string) {
    return this.prisma.user.findFirst({
      where: { id },
      include: { profile: true },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async createUser(data: CreateUserDto) {
    return await this.prisma.user.create({ data });
  }

  async updateUser(id: string, data: UpdateUserDto) {
    await this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }
}

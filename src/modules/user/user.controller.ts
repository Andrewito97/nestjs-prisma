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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { IdParamDto } from '../common/dto/id-param.dto';
import { User } from 'generated/prisma';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getPaginatedUsers(
    @Query() data: PaginationDto,
  ): Promise<{ users: User[]; total: number }> {
    const users = await this.userService.getUsers(data);
    const total = await this.userService.countUsers();

    return { users, total };
  }

  @Get(':id')
  async getUser(@Param() { id }: IdParamDto): Promise<User> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    return user;
  }

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<void> {
    await this.userService.createUser(data);
  }

  @Patch(':id')
  async updateUser(
    @Param() { id }: IdParamDto,
    @Body() data: UpdateUserDto,
  ): Promise<void> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    await this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param() { id }: IdParamDto): Promise<void> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    await this.userService.deleteUser(id);
  }
}

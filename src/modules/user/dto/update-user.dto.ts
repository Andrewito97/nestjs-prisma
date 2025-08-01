import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'generated/prisma';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

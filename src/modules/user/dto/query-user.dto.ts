import { IsOptional, IsString, IsEnum, IsBoolean, IsIn } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { SortDto } from '../../../common/dto/sort.dto';
import { UserType } from '../enums/user-type.enum';

export class QueryUserDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Search term for firstName, lastName, or email',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by user type',
    enum: UserType,
    example: UserType.STUDENT,
  })
  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;

  @ApiPropertyOptional({
    description: 'Filter by city',
    example: 'Colombo',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: 'Filter by district',
    example: 'Colombo',
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({
    description: 'Filter by province',
    example: 'Western',
  })
  @IsOptional()
  @IsString()
  province?: string;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    enum: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt', 'userType', 'city', 'district', 'province'],
    default: 'createdAt',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  @IsIn(['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt', 'userType', 'city', 'district', 'province'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
    example: 'DESC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}

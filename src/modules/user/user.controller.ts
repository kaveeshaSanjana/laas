import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PaginatedUserResponseDto } from './dto/paginated-user-response.dto';
import { UserType } from './enums/user-type.enum';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conflict - Email, NIC, or Birth Certificate already exists' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users with filtering and pagination' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully', type: PaginatedUserResponseDto })
  async findAll(@Query() query: QueryUserDto): Promise<PaginatedUserResponseDto> {
    return await this.usersService.findAll(query);
  }

  @Get('active-count')
  @ApiOperation({ summary: 'Get count of active users' })
  @ApiResponse({ status: 200, description: 'Active users count retrieved successfully' })
  async getActiveUsersCount(): Promise<{ count: number }> {
    const count = await this.usersService.getActiveUsersCount();
    return { count };
  }

  @Get('by-type/:userType')
  @ApiOperation({ summary: 'Get users by type' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async getUsersByType(@Param('userType') userType: UserType): Promise<UserResponseDto[]> {
    return await this.usersService.getUsersByType(userType);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Email or NIC already exists' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate user' })
  @ApiResponse({ status: 200, description: 'User activated successfully', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async activate(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.activate(id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate user (soft delete)' })
  @ApiResponse({ status: 200, description: 'User deactivated successfully', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deactivate(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.softDelete(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user permanently' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(id);
  }
}

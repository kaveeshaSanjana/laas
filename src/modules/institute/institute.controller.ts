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
  ParseIntPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery
} from '@nestjs/swagger';
import { InstitutesService } from './institute.service';
import {
  CreateInstituteDto,
  UpdateInstituteDto,
  InstituteResponseDto,
  InstituteQueryDto,
  PaginatedInstituteResponseDto
} from './dto/index.dto';

@ApiTags('Institutes')
@Controller('institutes')
@UseInterceptors(ClassSerializerInterceptor)
export class InstitutesController {
  constructor(private readonly institutesService: InstitutesService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new institute',
    description: 'Creates a new educational institute in the system'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Institute created successfully',
    type: InstituteResponseDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Institute with code or email already exists'
  })
  async create(@Body() createInstituteDto: CreateInstituteDto): Promise<InstituteResponseDto> {
    const institute = await this.institutesService.create(createInstituteDto);
    return new InstituteResponseDto(institute);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all institutes with pagination and filtering',
    description: 'Retrieves a paginated list of institutes with optional filtering'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Institutes retrieved successfully',
    type: PaginatedInstituteResponseDto
  })
  async findAll(@Query() query: InstituteQueryDto): Promise<PaginatedInstituteResponseDto> {
    return this.institutesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get institute by ID',
    description: 'Retrieves a specific institute by its ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Institute ID',
    example: '1'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Institute found',
    type: InstituteResponseDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Institute not found'
  })
  async findOne(@Param('id') id: string): Promise<InstituteResponseDto> {
    const institute = await this.institutesService.findOne(id);
    return new InstituteResponseDto(institute);
  }

  @Get('code/:code')
  @ApiOperation({
    summary: 'Get institute by code',
    description: 'Retrieves a specific institute by its unique code'
  })
  @ApiParam({
    name: 'code',
    description: 'Institute code',
    example: 'CIS001'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Institute found',
    type: InstituteResponseDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Institute not found'
  })
  async findByCode(@Param('code') code: string): Promise<InstituteResponseDto> {
    const institute = await this.institutesService.findByCode(code);
    return new InstituteResponseDto(institute);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update institute',
    description: 'Updates an existing institute'
  })
  @ApiParam({
    name: 'id',
    description: 'Institute ID',
    example: '1'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Institute updated successfully',
    type: InstituteResponseDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Institute not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data'
  })
  async update(
    @Param('id') id: string,
    @Body() updateInstituteDto: UpdateInstituteDto
  ): Promise<InstituteResponseDto> {
    const institute = await this.institutesService.update(id, updateInstituteDto);
    return new InstituteResponseDto(institute);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Soft delete institute',
    description: 'Soft deletes an institute (sets isActive to false)'
  })
  @ApiParam({
    name: 'id',
    description: 'Institute ID',
    example: '1'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Institute deleted successfully'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Institute not found'
  })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.institutesService.remove(id);
    return { message: 'Institute deleted successfully' };
  }

  @Patch(':id/activate')
  @ApiOperation({
    summary: 'Activate institute',
    description: 'Activates a previously deactivated institute'
  })
  @ApiParam({
    name: 'id',
    description: 'Institute ID',
    example: '1'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Institute activated successfully',
    type: InstituteResponseDto
  })
  async activate(@Param('id') id: string): Promise<InstituteResponseDto> {
    const institute = await this.institutesService.activate(id);
    return new InstituteResponseDto(institute);
  }

  @Patch(':id/deactivate')
  @ApiOperation({
    summary: 'Deactivate institute',
    description: 'Deactivates an institute without deleting it'
  })
  @ApiParam({
    name: 'id',
    description: 'Institute ID',
    example: '1'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Institute deactivated successfully',
    type: InstituteResponseDto
  })
  async deactivate(@Param('id') id: string): Promise<InstituteResponseDto> {
    const institute = await this.institutesService.deactivate(id);
    return new InstituteResponseDto(institute);
  }
}
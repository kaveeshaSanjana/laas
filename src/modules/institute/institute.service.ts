// src/modules/institute/institute.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere, In } from 'typeorm';
import { InstituteEntity } from './entities/institute.entity';
import {
  CreateInstituteDto,
  UpdateInstituteDto,
  InstituteQueryDto,
  InstituteResponseDto,
  PaginatedInstituteResponseDto
} from './dto/index.dto';

@Injectable()
export class InstitutesService {
  constructor(
    @InjectRepository(InstituteEntity)
    private readonly instituteRepository: Repository<InstituteEntity>,
  ) {}

  async create(createInstituteDto: CreateInstituteDto): Promise<InstituteEntity> {
    // Check if institute with same code or email already exists
    const existingInstitute = await this.instituteRepository.findOne({
      where: [
        { code: createInstituteDto.code },
        { email: createInstituteDto.email }
      ]
    });

    if (existingInstitute) {
      if (existingInstitute.code === createInstituteDto.code) {
        throw new ConflictException('Institute with this code already exists');
      }
      if (existingInstitute.email === createInstituteDto.email) {
        throw new ConflictException('Institute with this email already exists');
      }
    }

    const institute = this.instituteRepository.create(createInstituteDto);
    return this.instituteRepository.save(institute);
  }

  async findAll(query: InstituteQueryDto): Promise<PaginatedInstituteResponseDto> {
    const {
      search,
      city,
      state,
      country,
      isActive,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = query;

    const where: FindOptionsWhere<InstituteEntity> = {};

    // Apply filters
    if (search) {
      where.name = Like(`%${search}%`);
      // You could also search by code: where.code = Like(`%${search}%`);
    }

    if (city) {
      where.city = city;
    }

    if (state) {
      where.state = state;
    }

    if (country) {
      where.country = country;
    }

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    const [data, total] = await this.instituteRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });

    const responseData = data.map(institute => new InstituteResponseDto(institute));
    return new PaginatedInstituteResponseDto(responseData, total, page, limit);
  }

  async findOne(id: string): Promise<InstituteEntity> {
    const institute = await this.instituteRepository.findOne({
      where: { id, isActive: true }
    });

    if (!institute) {
      throw new NotFoundException(`Institute with ID ${id} not found`);
    }

    return institute;
  }

  async findByCode(code: string): Promise<InstituteEntity> {
    const institute = await this.instituteRepository.findOne({
      where: { code, isActive: true }
    });

    if (!institute) {
      throw new NotFoundException(`Institute with code ${code} not found`);
    }

    return institute;
  }

  async update(id: string, updateInstituteDto: UpdateInstituteDto): Promise<InstituteEntity> {
    const institute = await this.findOne(id);

    // Check for email conflicts if email is being updated
    if (updateInstituteDto.email && updateInstituteDto.email !== institute.email) {
      const existingInstitute = await this.instituteRepository.findOne({
        where: { email: updateInstituteDto.email }
      });

      if (existingInstitute && existingInstitute.id !== id) {
        throw new ConflictException('Institute with this email already exists');
      }
    }

    Object.assign(institute, updateInstituteDto);
    return this.instituteRepository.save(institute);
  }

  async remove(id: string): Promise<void> {
    const institute = await this.findOne(id);
    institute.isActive = false;
    await this.instituteRepository.save(institute);
  }

  async activate(id: string): Promise<InstituteEntity> {
    const institute = await this.instituteRepository.findOne({
      where: { id }
    });

    if (!institute) {
      throw new NotFoundException(`Institute with ID ${id} not found`);
    }

    institute.isActive = true;
    return this.instituteRepository.save(institute);
  }

  async deactivate(id: string): Promise<InstituteEntity> {
    const institute = await this.findOne(id);
    institute.isActive = false;
    return this.instituteRepository.save(institute);
  }

  // Utility method for bulk operations
  async findByIds(ids: string[]): Promise<InstituteEntity[]> {
    return this.instituteRepository.find({
      where: { id: In(ids), isActive: true }
    });
  }

  // Method to get institute statistics
  async getStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    byCountry: Array<{ country: string; count: number }>;
  }> {
    const [total, active] = await Promise.all([
      this.instituteRepository.count(),
      this.instituteRepository.count({ where: { isActive: true } })
    ]);

    const byCountry = await this.instituteRepository
      .createQueryBuilder('institute')
      .select('institute.country', 'country')
      .addSelect('COUNT(*)', 'count')
      .where('institute.isActive = :isActive', { isActive: true })
      .groupBy('institute.country')
      .getRawMany();

    return {
      total,
      active,
      inactive: total - active,
      byCountry: byCountry.map(item => ({
        country: item.country || 'Unknown',
        count: parseInt(item.count)
      }))
    };
  }
}
// src/users/users.service.ts
import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like, ILike } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PaginatedUserResponseDto } from './dto/paginated-user-response.dto';
import { UserType } from './enums/user-type.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Check for existing email
    if (createUserDto.email) {
      const existingEmail = await this.userRepository.findOne({
        where: { email: createUserDto.email }
      });
      if (existingEmail) {
        throw new ConflictException('Email already exists');
      }
    }

    // Check for existing NIC
    if (createUserDto.nic) {
      const existingNic = await this.userRepository.findOne({
        where: { nic: createUserDto.nic }
      });
      if (existingNic) {
        throw new ConflictException('NIC already exists');
      }
    }

    // Check for existing birth certificate
    if (createUserDto.birthCertificateNo) {
      const existingBirthCert = await this.userRepository.findOne({
        where: { birthCertificateNo: createUserDto.birthCertificateNo }
      });
      if (existingBirthCert) {
        throw new ConflictException('Birth certificate number already exists');
      }
    }

    // Hash password if provided
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    }

    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    
    return new UserResponseDto(savedUser);
  }

  async findAll(query: QueryUserDto): Promise<PaginatedUserResponseDto> {
    const { search, userType, city, district, province, isActive, page, limit, sortBy, sortOrder } = query;
    
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    // Apply filters
    if (search) {
      queryBuilder.andWhere(
        '(user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.email ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (userType) {
      queryBuilder.andWhere('user.userType = :userType', { userType });
    }

    if (city) {
      queryBuilder.andWhere('user.city ILIKE :city', { city: `%${city}%` });
    }

    if (district) {
      queryBuilder.andWhere('user.district ILIKE :district', { district: `%${district}%` });
    }

    if (province) {
      queryBuilder.andWhere('user.province ILIKE :province', { province: `%${province}%` });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('user.isActive = :isActive', { isActive });
    }

    // Apply sorting
    queryBuilder.orderBy(`user.${sortBy}`, sortOrder);

    // Apply pagination
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const skip = (pageNumber - 1) * limitNumber;
    queryBuilder.skip(skip).take(limitNumber);

    const [users, total] = await queryBuilder.getManyAndCount();

    const userResponseDtos = users.map(user => new UserResponseDto(user));
    
    return new PaginatedUserResponseDto(userResponseDtos, pageNumber, limitNumber, total);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new UserResponseDto(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByNic(nic: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { nic } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check for existing email if updating email
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.userRepository.findOne({
        where: { email: updateUserDto.email }
      });
      if (existingEmail) {
        throw new ConflictException('Email already exists');
      }
    }

    // Check for existing NIC if updating NIC
    if (updateUserDto.nic && updateUserDto.nic !== user.nic) {
      const existingNic = await this.userRepository.findOne({
        where: { nic: updateUserDto.nic }
      });
      if (existingNic) {
        throw new ConflictException('NIC already exists');
      }
    }

    // Hash password if provided
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    }

    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found after update`);
    }
    return new UserResponseDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(user);
  }

  async softDelete(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    user.isActive = false;
    const updatedUser = await this.userRepository.save(user);
    return new UserResponseDto(updatedUser);
  }

  async activate(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    user.isActive = true;
    const updatedUser = await this.userRepository.save(user);
    return new UserResponseDto(updatedUser);
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async getActiveUsersCount(): Promise<number> {
    return await this.userRepository.count({ where: { isActive: true } });
  }

  async getUsersByType(userType: UserType): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({ where: { userType } });
    return users.map(user => new UserResponseDto(user));
  }
}

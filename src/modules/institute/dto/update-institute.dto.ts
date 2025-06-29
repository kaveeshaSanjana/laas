import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsString, IsEmail, MaxLength, MinLength } from 'class-validator';

export class UpdateInstituteDto {
  @ApiPropertyOptional({
    description: 'Institute name',
    example: 'Cambridge International School',
    maxLength: 255
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Institute email address',
    example: 'admin@cambridge-school.edu'
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({
    description: 'Contact phone number',
    example: '+1-234-567-8900',
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Institute address',
    example: '123 Education Street, Academic District'
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'City',
    example: 'New York',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @ApiPropertyOptional({
    description: 'State or Province',
    example: 'New York',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @ApiPropertyOptional({
    description: 'Country',
    example: 'United States',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({
    description: 'Postal/ZIP code',
    example: '10001',
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  pinCode?: string;

  @ApiPropertyOptional({
    description: 'Whether the institute is active',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

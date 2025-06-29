// src/modules/institute/dto/create-institute.dto.ts
import { 
  IsString, 
  IsEmail, 
  IsOptional, 
  IsNotEmpty, 
  MaxLength, 
  MinLength,
  Matches 
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInstituteDto {
  @ApiProperty({
    description: 'Institute name',
    example: 'Cambridge International School',
    maxLength: 255
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Unique institute code',
    example: 'CIS001',
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  @Matches(/^[A-Z0-9_-]+$/, {
    message: 'Code must contain only uppercase letters, numbers, hyphens, and underscores'
  })
  code: string;

  @ApiProperty({
    description: 'Institute email address',
    example: 'admin@cambridge-school.edu'
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

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
}
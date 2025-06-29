// src/modules/institute/dto/institute-response.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class InstituteResponseDto {
  @ApiProperty({
    description: 'Institute ID',
    example: '1'
  })
  @Expose()
  @Transform(({ value }) => value.toString())
  id: string;

  @ApiProperty({
    description: 'Institute name',
    example: 'Cambridge International School'
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Unique institute code',
    example: 'CIS001'
  })
  @Expose()
  code: string;

  @ApiProperty({
    description: 'Institute email address',
    example: 'admin@cambridge-school.edu'
  })
  @Expose()
  email: string;

  @ApiPropertyOptional({
    description: 'Contact phone number',
    example: '+1-234-567-8900'
  })
  @Expose()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Institute address',
    example: '123 Education Street, Academic District'
  })
  @Expose()
  address?: string;

  @ApiPropertyOptional({
    description: 'City',
    example: 'New York'
  })
  @Expose()
  city?: string;

  @ApiPropertyOptional({
    description: 'State or Province',
    example: 'New York'
  })
  @Expose()
  state?: string;

  @ApiPropertyOptional({
    description: 'Country',
    example: 'United States'
  })
  @Expose()
  country?: string;

  @ApiPropertyOptional({
    description: 'Postal/ZIP code',
    example: '10001'
  })
  @Expose()
  pinCode?: string;

  @ApiProperty({
    description: 'Whether the institute is active',
    example: true
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:30:00.000Z'
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-20T14:45:00.000Z'
  })
  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<InstituteResponseDto>) {
    Object.assign(this, partial);
  }
}

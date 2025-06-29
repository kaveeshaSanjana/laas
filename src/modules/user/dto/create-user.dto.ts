// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsOptional, IsEnum, IsBoolean, Length, IsPhoneNumber } from 'class-validator';
import { UserType } from '../enums/user-type.enum';

export class CreateUserDto {
  @IsString()
  @Length(1, 100)
  firstName: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(6, 255)
  password?: string;

  @IsOptional()
  @IsString()
  @Length(10, 20)
  phone?: string;

  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;

  @IsOptional()
  @IsString()
  @Length(10, 20)
  nic?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  birthCertificateNo?: string;

  @IsOptional()
  @IsString()
  addressLine1?: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  city?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  district?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  province?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  postalCode?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  country?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  imageUrl?: string;
}


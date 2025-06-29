
// src/users/dto/user-response.dto.ts
import { Exclude } from 'class-transformer';
import { UserType } from '../enums/user-type.enum';

export class UserResponseDto {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  userType?: UserType;
  nic?: string;
  birthCertificateNo?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  district?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;

  @Exclude()
  password?: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
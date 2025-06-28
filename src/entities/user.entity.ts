import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { StudentEntity } from './student.entity';
import { ParentEntity } from './parent.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ name: 'user_type', type: 'varchar', length: 50, nullable: true })
  userType?: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  nic?: string;

  @Column({ name: 'birth_certificate_no', type: 'varchar', length: 50, unique: true, nullable: true })
  birthCertificateNo?: string;

  @Column({ name: 'address_line1', type: 'text', nullable: true })
  addressLine1?: string;

  @Column({ name: 'address_line2', type: 'text', nullable: true })
  addressLine2?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  district?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  province?: string;

  @Column({ name: 'postal_code', type: 'varchar', length: 20, nullable: true })
  postalCode?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country?: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  imageUrl?: string;

  @OneToOne(() => StudentEntity, student => student.user)
  student: StudentEntity;


  @OneToOne(() => ParentEntity, parent => parent.user)
  parent: ParentEntity[];
}

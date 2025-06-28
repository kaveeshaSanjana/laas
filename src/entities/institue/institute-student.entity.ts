import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user.entity';
import { InstituteEntity } from '../institute.entity';

export enum InstituteStudentStatus {
  PRESENT = 'present',
  PAST = 'paststudent',
  FUTURE = 'future',
}

@Entity('institute_student')
export class InstituteStudentEntity {

  @PrimaryColumn({ name: 'institute_id', type: 'bigint' })
  instituteId: string;

  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  userId: string;

  @Column({ name: 'institute_student_id', type: 'varchar', length: 50, nullable: true })
  instituteStudentId?: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'joined_at', type: 'timestamp', nullable: true })
  joinedAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'status', type: 'enum', enum: InstituteStudentStatus, default: InstituteStudentStatus.PRESENT })
  status: InstituteStudentStatus;

    @ManyToOne(() => InstituteEntity)
    @JoinColumn({ name: 'institute_id' })
    institute: InstituteEntity;
  
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}

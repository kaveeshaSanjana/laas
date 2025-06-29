import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InstituteEntity } from '../../modules/institute/entities/institute.entity';
import { InstituteClassEntity } from '../institue/institute-class.entity';
import { UserEntity } from '../../modules/user/entities/user.entity';

@Entity('institute_class_lectures')
export class InstituteClassOnlineLectureEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'institute_id', type: 'bigint' })
  instituteId: string;

  @ManyToOne(() => InstituteEntity)
  @JoinColumn({ name: 'institute_id' })
  institute: InstituteEntity;

  @Column({ name: 'class_id', type: 'bigint' })
  classId: string;

  @ManyToOne(() => InstituteClassEntity)
  @JoinColumn({ name: 'class_id' })
  class: InstituteClassEntity;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'lecture_type', type: 'varchar', length: 20 })
  lectureType: string;

  @Column({ name: 'start_time', type: 'timestamp' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamp' })
  endTime: Date;

  @Column({ type: 'varchar', length: 20, default: 'SCHEDULED' })
  status: string;

  @Column({ name: 'meeting_link', type: 'text', nullable: true })
  meetingLink?: string;

  @Column({ name: 'teacher_id', type: 'bigint' })
  teacherId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'teacher_id' })
  teacher: UserEntity;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

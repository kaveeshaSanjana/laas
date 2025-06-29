import { InstituteEntity } from 'src/modules/institute/entities/institute.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InstituteClassEntity } from '../institue/institute-class.entity';
import { SubjectEntity } from '../subject.entity';
import { UserEntity } from '../../modules/user/entities/user.entity';

@Entity('institute_class_subject_lectures')
export class InstituteClassSubjectLectureEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'institute_id', type: 'bigint' })
  instituteId: string;

  @Column({ name: 'class_id', type: 'bigint' })
  classId: string;

  @Column({ name: 'subject_id', type: 'bigint' })
  subjectId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

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

  @Column({ name: 'recording_url', type: 'text', nullable: true })
  recordingUrl?: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  
    @ManyToOne(() => InstituteEntity)
      @JoinColumn({ name: 'institute_id' })
      institute: InstituteEntity;
  
    @ManyToOne(() => InstituteClassEntity)
    @JoinColumn({ name: 'class_id' })
    class: InstituteClassEntity;
  
    @ManyToOne(() => SubjectEntity)
    @JoinColumn({ name: 'subject_id' })
    subject: SubjectEntity;
  
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'teacher_id' })
    teacher: UserEntity;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InstituteEntity } from '../institute.entity';
import { InstituteClassEntity } from '../institue/institute-class.entity';
import { InstituteClassSubjectEntity } from '../institue_class/institute-class-subject.entity';
import { UserEntity } from '../user.entity';
import { SubjectEntity } from '../subject.entity';
import { InstituteClassSubjectOnlineExamEntity } from './institute-class-subject-online-exam.entity';

@Entity('institute_class_subject_online_exam_results')
export class InstituteClassSubjectOnlineExamResultEntity {
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

  @Column({ name: 'subject_id', type: 'bigint' })
  subjectId: string;
  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @Column({ name: 'exam_id', type: 'bigint' })
  examId: string;
  @ManyToOne(() => InstituteClassSubjectOnlineExamEntity)
  @JoinColumn({ name: 'exam_id' })
  exam: InstituteClassSubjectOnlineExamEntity;

  @Column({ name: 'student_id', type: 'bigint' })
  studentId: string;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: UserEntity;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  score?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  percentage?: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  grade?: string;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  submittedAt?: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

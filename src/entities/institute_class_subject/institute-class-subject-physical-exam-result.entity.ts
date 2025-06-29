import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InstituteEntity } from '../../modules/institute/entities/institute.entity';
import { InstituteClassEntity } from '../institue/institute-class.entity';
import { InstituteClassSubjectEntity } from '../institue_class/institute-class-subject.entity';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { InstituteClassSubjectPhysicalExamEntity } from './institute-class-subject-physical-exam.entity';
import { SubjectEntity } from '../subject.entity';

@Entity('institute_class_subject_physical_exam_results')
export class InstituteClassSubjectPhysicalExamResultEntity {
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

  @ManyToOne(() => InstituteClassSubjectPhysicalExamEntity)
  @JoinColumn({ name: 'exam_id' })
  exam: InstituteClassSubjectPhysicalExamEntity;

  @Column({ name: 'student_id', type: 'bigint' })
  studentId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: UserEntity;

  @Column({ name: 'marks_obtained', type: 'decimal', precision: 5, scale: 2, nullable: true })
  marksObtained?: string;

  @Column({ name: 'is_absent', type: 'boolean', default: false })
  isAbsent: boolean;

  @Column({ type: 'varchar', length: 5, nullable: true })
  grade?: string;// A, B, C, D, F

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @Column({ name: 'checked_by', type: 'bigint', nullable: true })
  checkedBy?: string;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'checked_by' })
  checker?: UserEntity;

  @Column({ name: 'checked_at', type: 'timestamp', nullable: true })
  checkedAt?: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InstituteEntity } from '../../modules/institute/entities/institute.entity';
import { InstituteClassEntity } from '../institue/institute-class.entity';
import { InstituteClassSubjectEntity } from '../institue_class/institute-class-subject.entity';
import { InstituteClassSubjectPhysicalExamResultEntity } from '../institute_class_subject/institute-class-subject-physical-exam-result.entity';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { SubjectEntity } from '../subject.entity';

@Entity('institute_class_subject_physical_exams')
export class InstituteClassSubjectPhysicalExamEntity {
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

  @Column({ name: 'exam_date', type: 'timestamp', nullable: true })
  examDate?: Date;

  @Column({ name: 'total_marks', type: 'decimal', precision: 5, scale: 2, nullable: true })
  totalMarks?: string;

  @Column({ name: 'mark_grade', type: 'text', nullable: true })
  resualtGrade?: string; //A,B,C,D,F

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

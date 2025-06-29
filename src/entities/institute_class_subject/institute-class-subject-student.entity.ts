import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InstituteEntity } from '../../modules/institute/entities/institute.entity';
import { InstituteClassEntity } from '../institue/institute-class.entity';
import { InstituteClassSubjectEntity } from '../institue_class/institute-class-subject.entity';
import { UserEntity } from '../../modules/user/entities/user.entity';
@Entity('institute_class_subject_students')
export class InstituteClassSubjectStudentEntity {
  @PrimaryColumn({ name: 'institute_id', type: 'bigint' })
  instituteId: string;

  @ManyToOne(() => InstituteEntity)
  @JoinColumn({ name: 'institute_id' })
  institute: InstituteEntity;

  @PrimaryColumn({ name: 'class_id', type: 'bigint' })
  classId: string;

  @ManyToOne(() => InstituteClassEntity)
  @JoinColumn({ name: 'class_id' })
  class: InstituteClassEntity;

  @PrimaryColumn({ name: 'subject_id', type: 'bigint' })
  subjectId: string;

  @PrimaryColumn({ name: 'class_subject_id', type: 'bigint' })
  classSubjectId: string;

  @ManyToOne(() => InstituteClassSubjectEntity)
  @JoinColumn({ name: 'class_subject_id' })
  classSubject: InstituteClassSubjectEntity;

  @PrimaryColumn({ name: 'student_id', type: 'bigint' })
  studentId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: UserEntity;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

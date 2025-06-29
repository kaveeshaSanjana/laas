import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { InstituteClassEntity } from '../institue/institute-class.entity';
import { SubjectEntity } from '../subject.entity';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { InstituteEntity } from 'src/modules/institute/entities/institute.entity';

@Entity('institute_class_subjects')
export class InstituteClassSubjectEntity {

  @PrimaryColumn({ name: 'institute_id', type: 'bigint' })
  instituteId: string;

  @PrimaryColumn({ name: 'class_id', type: 'bigint' })
  classId: string;

  @PrimaryColumn({ name: 'subject_id', type: 'bigint' })
  subjectId: string;

  @Column({ name: 'teacher_id', type: 'bigint' })
  teacherId: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

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

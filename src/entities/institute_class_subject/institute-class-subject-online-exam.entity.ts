import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InstituteEntity } from '../../modules/institute/entities/institute.entity';
import { InstituteClassEntity } from '../institue/institute-class.entity';
import { InstituteClassSubjectEntity } from '../institue_class/institute-class-subject.entity';
import { SubjectEntity } from '../subject.entity';

@Entity('institute_class_subject_online_exams')
export class InstituteClassSubjectOnlineExamEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'institute_id', type: 'bigint' })
  instituteId: string;

    @ManyToOne(() => InstituteEntity)
    @JoinColumn({ name: 'institute_id' })
    institute: InstituteEntity;
  
  @Column({ name: 'institute_class_id', type: 'bigint' })
  classId: string;
      
    @ManyToOne(() => InstituteClassEntity)
    @JoinColumn({ name: 'institute_class_id' })
    instituteClass: InstituteClassEntity;

  @Column({ name: 'subject_id', type: 'bigint' })
  SubjectId: string;

    @ManyToOne(() => SubjectEntity)
    @JoinColumn({ name: 'subject_id' })
    subjectEntity: SubjectEntity;

  @Column({ name: 'schedule_date', type: 'date', nullable: true })
  scheduleDate?: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'embedded_link', type: 'text', nullable: true })
  embeddedLink?: string;

  @Column({ name: 'to_whom', type: 'varchar', length: 50, default: 'everyone' })
  toWhom: string; // e.g. everyone, mandatory, optional, etc.


}

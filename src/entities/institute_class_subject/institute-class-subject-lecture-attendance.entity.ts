import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InstituteEntity } from '../institute.entity';
import { InstituteClassEntity } from '../institue/institute-class.entity';
import { InstituteClassSubjectEntity } from '../institue_class/institute-class-subject.entity';
import { InstituteClassSubjectLectureEntity } from './institute-class-subject-lecture.entity';
import { UserEntity } from '../user.entity';
import { SubjectEntity } from '../subject.entity';

@Entity('institute_class_subject_lecture_attendance')
export class InstituteClassSubjectLectureAttendanceEntity {
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

  @Column({ name: 'lecture_id', type: 'bigint' })
  lectureId: string;
  @ManyToOne(() => InstituteClassSubjectLectureEntity)
  @JoinColumn({ name: 'lecture_id' })
  lecture: InstituteClassSubjectLectureEntity;

  @Column({ name: 'student_id', type: 'bigint' })
  studentId: string;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: UserEntity;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @Column({ name: 'join_time', type: 'timestamp', nullable: true })
  joinTime?: Date;

  @Column({ name: 'leave_time', type: 'timestamp', nullable: true })
  leaveTime?: Date;

  @Column({ name: 'attendance_marked_by', type: 'bigint', nullable: true })
  attendanceMarkedBy?: string;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'attendance_marked_by' })
  marker?: UserEntity;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
}

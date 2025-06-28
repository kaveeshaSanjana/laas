import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserEntity } from '../user.entity';
import { InstituteEntity } from '../institute.entity';

@Entity('institute_attendance')
export class InstituteAttendanceEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'institute_id', type: 'bigint' })
  instituteId: string;

  @Column({ name: 'student_id', type: 'bigint' })
  studentId: string;

  @Column({ name: 'marked_by', type: 'bigint', nullable: true })
  markedBy?: string;

  @Column({ name: 'attendance_date', type: 'date' })
  attendanceDate: Date;

  @Column({ name: 'status', type: 'varchar', length: 20 }) // e.g. present, absent, late
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => InstituteEntity)
  @JoinColumn({ name: 'institute_id' })
  institute: InstituteEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  student: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'marked_by' })
  marker?: UserEntity;
}

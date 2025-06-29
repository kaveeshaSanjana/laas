import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../user.entity';
import { InstituteEntity } from '../../modules/institute/entities/institute.entity';

@Entity('institute_teacher')
export class InstituteTeacherEntity {
  @PrimaryColumn({ name: 'institute_id', type: 'bigint' })
  instituteId: string;

  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  userId: string;

  @ManyToOne(() => InstituteEntity)
  @JoinColumn({ name: 'institute_id' })
  institute: InstituteEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

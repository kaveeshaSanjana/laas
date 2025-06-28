import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../user.entity';
import { InstituteEntity } from '../institute.entity';

@Entity('institute_admin')
export class InstituteAdminEntity {
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

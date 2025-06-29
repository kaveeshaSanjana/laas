import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../modules/user/entities/user.entity';

@Entity('parents')
export class ParentEntity {
  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  userId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  relationship?: string; // FATHER, MOTHER, GUARDIAN

  @Column({ name: 'job_title', type: 'varchar', length: 100, nullable: true })
  jobTitle?: string;

  @Column({ type: 'text', nullable: true })
  workplace?: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

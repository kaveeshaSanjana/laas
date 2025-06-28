import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { ParentEntity } from './parent.entity';
import { UserEntity } from './user.entity';

@Entity('students')
export class StudentEntity {
  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  userId: string;

  @Column({ name: 'father_id', type: 'bigint', nullable: true })
  fatherId?: string;

  @Column({ name: 'mother_id', type: 'bigint', nullable: true })
  motherId?: string;

  @Column({ name: 'guardian_id', type: 'bigint', nullable: true })
  guardianId?: string;

  @ManyToOne(() => ParentEntity, { nullable: true })
  @JoinColumn({ name: 'father_id', referencedColumnName: 'userId' })
  father?: ParentEntity;

  @ManyToOne(() => ParentEntity, { nullable: true })
  @JoinColumn({ name: 'mother_id', referencedColumnName: 'userId' })
  mother?: ParentEntity;

  @ManyToOne(() => ParentEntity, { nullable: true })
  @JoinColumn({ name: 'guardian_id', referencedColumnName: 'userId' })
  guardian?: ParentEntity;

  @OneToOne(() => UserEntity, user => user.student)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

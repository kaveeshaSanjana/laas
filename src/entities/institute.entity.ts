// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// @Entity('institutes')
// export class InstituteEntity {
//   @PrimaryGeneratedColumn('increment', { type: 'bigint' })
//   id: string;

//   @Column({ type: 'varchar', length: 255 })
//   name: string;

//   @Column({ type: 'varchar', length: 50, unique: true })
//   code: string;

//   @Column({ type: 'varchar', length: 255, unique: true })
//   email: string;

//   @Column({ type: 'varchar', length: 20, nullable: true })
//   phone?: string;

//   @Column({ type: 'text', nullable: true })
//   address?: string;

//   @Column({ type: 'varchar', length: 100, nullable: true })
//   city?: string;

//   @Column({ type: 'varchar', length: 100, nullable: true })
//   state?: string;

//   @Column({ type: 'varchar', length: 100, nullable: true })
//   country?: string;

//   @Column({ name: 'pin_code', type: 'varchar', length: 20, nullable: true })
//   pinCode?: string;

//   @Column({ name: 'is_active', type: 'boolean', default: true })
//   isActive: boolean;

//   @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
//   createdAt: Date;

//   @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
//   updatedAt: Date;
// }

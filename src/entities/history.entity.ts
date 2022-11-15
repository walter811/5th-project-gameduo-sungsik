import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn({ type: 'int', name: 'raidRecordId' })
  raidRecordId: number;

  @Column({ type: 'int', name: 'level' })
  level: number;

  @Column({ type: 'int', name: 'score', nullable: true })
  score: number;

  @Column({ type: 'datetime', name: 'enterTime', nullable: true })
  enterTime: Date;

  @Column({ type: 'datetime', name: 'endTime', nullable: true })
  endTime: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.history, {
    cascade: ['insert', 'update', 'remove', 'soft-remove'],
  })
  user: User;
}

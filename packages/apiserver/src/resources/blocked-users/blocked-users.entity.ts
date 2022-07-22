import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../persons/person.entity';

@Entity('blocked-users')
export class BlockedUsers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description: string;

  @Column()
  state!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ nullable: true })
  person_id!: number;

  @ManyToOne(() => Person, (person) => person.state)
  @JoinColumn({ name: 'person_id' })
  person!: Person;
}

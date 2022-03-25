import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { StatusEntity } from '../statuses/status.entity';

@Entity('person')
export class PersonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  smg_id!: string;

  @Column()
  type!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => StatusEntity, (status) => status.person)
  status: StatusEntity[];
}

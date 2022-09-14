import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Material } from '../materials/material.entity';
import { Person } from '../persons/person.entity';
import { StatusTypes } from '@mimir/global-types';

@Entity('status')
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  material_id: number;

  @ManyToOne(() => Material, (material) => material.status)
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @Column({ nullable: true })
  person_id: number;

  @ManyToOne(() => Person, (person) => person.status)
  @JoinColumn({ name: 'person_id' })
  person!: Person;

  @Column({
    type: 'enum',
    enum: StatusTypes,
    default: StatusTypes.FREE,
  })
  status!: string;

  @CreateDateColumn()
  created_at!: Date;
}

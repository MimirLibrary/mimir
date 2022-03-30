import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Material } from '../materials/material.entity';
import { Person } from '../persons/person.entity';

@Entity('status')
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Material, (material) => material.status)
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @ManyToOne(() => Person, (person) => person.status)
  @JoinColumn({ name: 'person_id' })
  person!: Person;

  @Column()
  status!: string;

  @CreateDateColumn()
  created_at!: Date;
}

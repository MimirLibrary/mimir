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

@Entity('notification')
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  material_id: number;

  @Column({ nullable: true })
  person_id: number;

  @ManyToOne(() => Material, (material) => material.notification)
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @ManyToOne(() => Person, (person) => person.notification)
  @JoinColumn({ name: 'person_id' })
  person!: Person;

  @CreateDateColumn()
  created_at!: Date;
}

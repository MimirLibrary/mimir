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

@Entity('message')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  material_id: number;

  @Column({ nullable: true })
  person_id: number;

  @Column()
  location_id!: number;

  @Column()
  title!: string;

  @Column()
  message!: string;

  @ManyToOne(() => Material, (material) => material.message)
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @ManyToOne(() => Person, (person) => person.message)
  @JoinColumn({ name: 'person_id' })
  person!: Person;

  @CreateDateColumn()
  created_at!: Date;
}

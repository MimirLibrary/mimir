import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { MaterialEntity } from '../materials/material.entity';
import { PersonEntity } from '../persons/person.entity';

@Entity('status')
export class StatusEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => MaterialEntity, (material) => material.status)
  @JoinColumn({ name: 'material_id' })
  material!: MaterialEntity;

  @ManyToOne(() => PersonEntity, (person) => person.status)
  @JoinColumn({ name: 'person_id' })
  person!: PersonEntity;

  @Column()
  status!: string;

  @Column()
  created_at!: Date;
}

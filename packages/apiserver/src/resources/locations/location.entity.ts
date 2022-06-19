import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Material } from '../materials/material.entity';
import { Person } from '../persons/person.entity';

@Entity('location')
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  location!: string;

  @OneToMany(() => Person, (person) => person.location)
  person: Person[];

  @OneToMany(() => Material, (material) => material.location)
  material: Material[];
}

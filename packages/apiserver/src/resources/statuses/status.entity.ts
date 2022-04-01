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
import { CreateStatusInput } from '../../__generated/graphql_types';
import { BadRequestException } from '@nestjs/common';

@Entity('status')
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  material_id: string | number;

  @ManyToOne(() => Material, (material) => material.status)
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @Column({ nullable: true })
  person_id: string | number;

  @ManyToOne(() => Person, (person) => person.status)
  @JoinColumn({ name: 'person_id' })
  person!: Person;

  @Column()
  status!: string;

  @CreateDateColumn()
  created_at!: Date;

  static async createStatus(createStatusInput: CreateStatusInput) {
    const status = await Status.create(createStatusInput);
    try {
      await Status.save(status);
    } catch (e) {
      throw new BadRequestException();
    }
    return status;
  }
}

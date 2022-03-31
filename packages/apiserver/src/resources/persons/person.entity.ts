import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../statuses/status.entity';
import { CreatePersonInput } from '../../__generated/graphql_types';

@Entity('person')
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  smg_id!: string;

  @Column()
  type!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Status, (status) => status.person)
  status: Status[];

  static async createPerson(createPersonInput: CreatePersonInput) {
    const person = await Person.create(createPersonInput);
    await Person.save(person);
    return person;
  }
}

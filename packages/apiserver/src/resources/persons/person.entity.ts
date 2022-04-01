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
import {UnauthorizedException} from "@nestjs/common";

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
    const { smg_id } = createPersonInput;
    const personFind = await Person.findOne(smg_id);
    if (personFind) {
      return new UnauthorizedException('A person already exists');
    }
    const person = await Person.create(createPersonInput);
    await Person.save(person);
    return person;
  }
}

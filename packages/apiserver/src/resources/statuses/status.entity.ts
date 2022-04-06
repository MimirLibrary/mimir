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

  @Column()
  status!: string;

  @CreateDateColumn()
  created_at!: Date;

  static async createNewStatus(currentStatus: Status, statusType: string) {
    const statusInput = {
      status: statusType,
      material_id: currentStatus.material_id,
      person_id: currentStatus.person_id,
    };
    const newStatus = await Status.create(statusInput);
    await Status.save(newStatus);
    return newStatus;
  }
}

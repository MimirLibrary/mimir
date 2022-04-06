import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Status } from '../statuses/status.entity';
import { CreateMaterialInput } from '../../__generated/graphql_types';

@Entity('material')
export class Material extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  identifier!: string;

  @Column()
  id_type!: string;

  @Column()
  type!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Status, (status) => status.material)
  status!: Status[];
}

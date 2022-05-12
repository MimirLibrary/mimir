import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../statuses/status.entity';

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

  @Column({ unique: true })
  id_internal!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Status, (status) => status.material)
  status!: Status[];
}

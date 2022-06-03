import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Notification } from '../notifications/notification.entity';
import { Status } from '../statuses/status.entity';

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

  @OneToMany(() => Notification, (notification) => notification.person)
  notification: Notification[];
}

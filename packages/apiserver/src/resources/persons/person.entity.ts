import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Notification } from '../notifications/notification.entity';
import { Status } from '../statuses/status.entity';
import { Message } from '../messages/messages.entity';
import { Location } from '../locations/location.entity';

@Entity('person')
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  smg_id!: string;

  @Column()
  type!: string;

  @Column({ nullable: true })
  location_id: number;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Status, (status) => status.person)
  status: Status[];

  @OneToMany(() => Notification, (notification) => notification.person)
  notification: Notification[];

  @OneToMany(() => Message, (message) => message.person)
  message: Message[];

  @ManyToOne(() => Location, (location) => location.person)
  @JoinColumn({ name: 'location_id' })
  location: Location;
}

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
import { Message } from '../messages/message.entity';
import { Location } from '../locations/location.entity';
import { BlockedUsers } from '../blocked-users/blocked-users.entity';
import { Permissions } from '@mimir/global-types';

@Entity('person')
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  smg_id!: string;

  @Column()
  email!: string;

  @Column()
  position!: string;

  @Column()
  type!: string;

  @Column()
  username!: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  location_id: number;

  @Column({ nullable: true })
  permissions: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Status, (status) => status.person)
  status: Status[];

  @OneToMany(() => Notification, (notification) => notification.person)
  notification: Notification[];

  @OneToMany(() => Message, (message) => message.person)
  message: Message[];

  @OneToMany(() => BlockedUsers, (blockedUsers) => blockedUsers.person)
  state: BlockedUsers[];

  @ManyToOne(() => Location, (location) => location.person)
  @JoinColumn({ name: 'location_id' })
  location: Location;
}

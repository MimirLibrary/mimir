import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Notification } from '../notifications/notification.entity';
import { Status } from '../statuses/status.entity';
import { Message } from '../messages/message.entity';
import { Location } from '../locations/location.entity';
import { BlockedUsers } from '../blocked-users/blocked-users.entity';

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
  permissions: string;

  @Column({ name: 'last_seen_notification_date', nullable: true })
  lastSeenNotificationDate: Date;

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

  @ManyToMany(() => Location, (location) => location.person, { cascade: true })
  @JoinTable({
    name: 'person_location',
    joinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'location_id',
      referencedColumnName: 'id',
    },
  })
  location: Location[];
}

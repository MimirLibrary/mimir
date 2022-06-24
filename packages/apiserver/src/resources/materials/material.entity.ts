import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Location } from '../locations/location.entity';
import { Notification } from '../notifications/notification.entity';
import { Status } from '../statuses/status.entity';
import { Message } from '../messages/messages.entity';

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

  @Column({ nullable: true })
  picture: string;

  @Column()
  title!: string;

  @Column()
  category!: string;

  @Column()
  author!: string;

  @Column({ nullable: true })
  location_id: number;

  @OneToMany(() => Status, (status) => status.material)
  status!: Status[];

  @OneToMany(() => Notification, (notification) => notification.material)
  notification!: Notification[];

  @OneToMany(() => Message, (message) => message.material)
  message!: Message[];

  @ManyToOne(() => Location, (location) => location.material)
  @JoinColumn({ name: 'location_id' })
  location: Location;
}

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Location } from '../locations/location.entity';
import { Notification } from '../notifications/notification.entity';
import { Status } from '../statuses/status.entity';
import { Message } from '../messages/message.entity';

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

  @Column({ name: 'original_picture', nullable: true })
  originalPicture: string;

  @Column()
  title!: string;

  @Column()
  category!: string;

  @Column()
  author!: string;

  @Column()
  description: string;

  @Column()
  is_donated: boolean;

  @Column({ nullable: true })
  location_id: number;

  @Column({ name: 'claim_count' })
  claimCount: number;

  @Column({ name: 'current_status_id', nullable: true })
  currentStatusId: number;

  @Column({ name: 'claim_duration', nullable: false })
  claimDuration: number;

  @OneToMany(() => Status, (status) => status.material)
  status!: Status[];

  @OneToMany(() => Notification, (notification) => notification.material)
  notification!: Notification[];

  @OneToMany(() => Message, (message) => message.material)
  message!: Message[];

  @ManyToOne(() => Location, (location) => location.material)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @OneToOne(() => Status, (status) => status.material)
  @JoinColumn({ name: 'current_status_id' })
  currentStatus: Status;
}

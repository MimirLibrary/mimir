import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @OneToMany(() => Status, (status) => status.material)
  status!: Status[];

  @OneToMany(() => Notification, (notification) => notification.material)
  notification!: Notification[];

  @OneToMany(() => Message, (message) => message.material)
  message!: Message[];
}

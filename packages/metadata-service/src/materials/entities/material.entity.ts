import {
  Column,
  Entity,
  Index,
  OneToOne,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import { Author } from './author.entity';
import { BaseEntity } from './base.entity';
import { Job } from './job.entity';
import { Publisher } from './publisher.entity';

@Entity()
export class Material extends BaseEntity {
  @Column()
  @Index()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => Author)
  @JoinTable()
  authors: Array<Author>;

  @ManyToOne(() => Publisher)
  publisher: Publisher;

  @Column({
    type: 'smallint',
    unsigned: true,
    comment: 'Year published',
  })
  yearPublishedAt: number;

  @Column({
    type: 'smallint',
    unsigned: true,
    comment: 'Month published',
  })
  monthPublishedAt: number;

  @Column()
  cover: string;

  @Column({
    type: 'jsonb',
    comment: 'Various metadata provided by the Data Source',
  })
  meta: Object;

  @OneToOne(() => Job)
  job: Job;
}

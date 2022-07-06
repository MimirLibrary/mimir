import { Column, Entity, Index, OneToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Job } from './job.entity';

@Entity()
@Index(['name', 'identifier'], { unique: true })
export class Publisher extends BaseEntity {
  @Column()
  @Index()
  name: string;

  @Column({
    comment: 'Identifies publishers with the same name',
  })
  @Index()
  identifier: string;

  @Column({
    type: 'jsonb',
    comment: 'Various metadata provided by the Data Source',
  })
  meta: Object;

  @OneToOne(() => Job)
  job: Job;
}

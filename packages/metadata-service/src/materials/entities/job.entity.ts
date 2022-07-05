import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

enum Status {
  PENDING = 'PENDING',
  FOUND = 'FOUND',
  MISS = 'MISS',
}

@Entity()
export class Job extends BaseEntity {
  static readonly Status = Status;
  readonly Status = Job.Status;

  @Column({
    type: 'timestamp',
    comment: 'Job start time',
  })
  startedAt: string;

  @Column({
    type: 'timestamp',
    comment: 'Job finish time',
  })
  finisherAt: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column({
    type: 'jsonb',
    comment: 'Various metadata for the job run (url, api, version, etc)',
  })
  meta: Object;
}

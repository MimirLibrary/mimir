import { Column, Entity, Index, OneToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Job } from './job.entity';

enum Type {
  ISBN_10 = 'ISBN-10',
  ISBN_13 = 'ISBN-13',
}

@Entity()
export class Identifier extends BaseEntity {
  static readonly Type = Type;
  readonly Type = Identifier.Type;

  @Column()
  @Index()
  value: string;

  @Column({
    type: 'enum',
    enum: Type,
  })
  idType: string;

  @Column({
    type: 'int',
    unsigned: true,
    default: 1,
    comment: 'Number requests for this Identifier',
  })
  hits: number;

  @Column({
    type: 'jsonb',
    comment: 'Various metadata provided by the Data Source',
  })
  meta: Object;

  @OneToOne(() => Job)
  job: Job;
}

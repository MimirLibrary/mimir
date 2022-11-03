import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Material } from '../materials/material.entity';
import { Person } from '../persons/person.entity';
import { StatusTypes } from '@mimir/global-types';
import { validateOrReject } from 'class-validator';
import { sm } from 'jssm';

// Could be visualized here:
// https://stonecypher.github.io/jssm-viz-demo/graph_explorer.html
const StatusFSM = sm`
  INIT 'Donate/User' -> PENDING 'Accept' -> NEW;
  PENDING 'Reject' -> REJECTED;
  INIT 'Donate/Admin' -> NEW;
  NEW 'Claim' -> IN_USE;
  FREE 'Claim' -> IN_USE 'Return' -> FREE;
  IN_USE 'Prolong' -> PROLONG 'Return' -> FREE;
  PROLONG 'Prolong' -> PROLONG;
  OVERDUE 'Return' -> FREE;
  [NEW FREE IN_USE PROLONG OVERDUE] 'Suspend' ~> SUSPEND;
  [IN_USE PROLONG] 'Ephemeral/Overue' ~> OVERDUE;
  SUSPEND 'Resume' ~> FREE;
`

@Entity('status')
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  material_id: number;

  @ManyToOne(() => Material, (material) => material.status)
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @Column({ nullable: true })
  person_id: number;

  @ManyToOne(() => Person, (person) => person.status)
  @JoinColumn({ name: 'person_id' })
  person!: Person;

  @Column({
    type: 'enum',
    enum: StatusTypes,
    default: StatusTypes.NEW,
  })
  status!: StatusTypes;

  @CreateDateColumn()
  created_at!: Date;

  @BeforeUpdate()
  updateHandler() {
    return Promise.reject(
      'Status updates are intentionally not allowed. Create a new status record instead'
    )
  }

  // TODO add migrations
  @BeforeInsert()
  async validate() {
    const previous = await Status.createQueryBuilder('status')
      .where(
        'person_id = :p_id and material_id = :m_id',
        {
          p_id: this.person_id,
          m_id: this.material_id,
        }
      )
      .orderBy('created_at', 'DESC')
      .take(1)
      .getOne();

    const oldStatus = previous ? previous.status : StatusTypes.INIT;
    const newStatus = this.status;

    // Imperatively set state
    StatusFSM.force_transition(oldStatus);
    if (!StatusFSM.go(newStatus)) {
      return Promise.reject(`Invalid status transition [${oldStatus}] -> [${newStatus}]!`)
    }
  }
}

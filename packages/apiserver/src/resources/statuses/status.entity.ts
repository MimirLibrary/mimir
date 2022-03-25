import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MaterialEntity } from '../materials/material.entity';
import { JoinColumn } from 'typeorm/browser';

@Entity('status')
export class StatusEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => MaterialEntity, (material) => material.status)
  @JoinColumn({ name: 'material_id' })
  material!: MaterialEntity;

  //todo: add table:person relation

  @Column()
  status!: string;

  @Column()
  created_at!: Date;
}

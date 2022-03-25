import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEntity } from '../statuses/status.entity';

@Entity('material')
export class MaterialEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  identifier!: string;

  @Column()
  id_type!: string;

  @Column()
  type!: string;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @OneToMany(() => StatusEntity, (status) => status.material)
  status!: StatusEntity[];
}

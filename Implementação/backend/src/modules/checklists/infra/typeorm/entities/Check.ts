import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Checklist from '@modules/checklists/infra/typeorm/entities/CheckList';

@Entity('checks')
class Check {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  checklist_id: string;

  @ManyToOne(() => Checklist)
  @JoinColumn({ name: 'checklist_id' })
  checklist: Checklist;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Check;

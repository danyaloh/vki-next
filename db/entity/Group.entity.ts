// db/entity/Group.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  // Доп. информация (необязательно)
  @Column({ nullable: true })
  contacts?: string;
}

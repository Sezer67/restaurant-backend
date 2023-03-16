import { Role } from 'src/enums/user.enum';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'text', enum: Role, nullable: false, default: Role.Customer })
  role: Role;
}

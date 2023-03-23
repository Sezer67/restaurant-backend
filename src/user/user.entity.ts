import { Role } from 'src/enums/user.enum';
import { Restaurant } from 'src/restaurant/restaurant.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne(() => Restaurant, (entity) => entity.user, { nullable: true })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;
}

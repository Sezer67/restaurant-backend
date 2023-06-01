import { RestaurantType } from 'src/enums/restaurant.enum';
import { Menu } from 'src/menu/menu.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('restaurant')
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 55, nullable: false })
  name: string;

  @Column({ nullable: false })
  city: string;

  @Column()
  address: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: false })
  isWifi: boolean;

  @Column({nullable: true, default: null})
  img: string;

  @Column({
    type: 'smallint',
    enum: RestaurantType,
    default: RestaurantType.Cafe,
  })
  type: RestaurantType;

  @OneToOne(() => User, (entity) => entity.restaurant, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Menu, (entity) => entity.restaurant, {onDelete: 'CASCADE'})
  menus: Menu[];
}

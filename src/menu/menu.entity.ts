import { Restaurant } from "src/restaurant/restaurant.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('menu')
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    img: string;

    @Column({nullable: false, default: 0})
    price: number;

    @ManyToOne(() => Restaurant, (entity) => entity.menus, { nullable: false })
    @JoinColumn({name: 'restaurantId'})
    restaurant: Restaurant;

    @Column()
    restaurantId: string;
}
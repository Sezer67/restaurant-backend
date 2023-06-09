import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Menu } from "./menu.entity";
import { Repository } from "typeorm";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { User } from "src/user/user.entity";
import { UpdateMenuDto } from "./dto/update-menu.dto";

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private readonly repo: Repository<Menu>,
    ){}

    async create(dto: CreateMenuDto, user: User):Promise<Menu> {
        try {
            const menu = await this.repo.save(dto);
            return menu;
        } catch (error) {
            throw error;
        }
    }

    async getRestaurantMenuById(id: string): Promise<{ rows: Menu[], count: number }> {
        try {
            // order eklenebilir şuan default title a göre sort
            const [rows, count] = await this.repo.findAndCount({
                where: {
                    restaurantId: id
                }, 
                order: {
                    title: 'ASC'
                }
            });
            if(!rows){
                throw new HttpException('Restaurant is not Found',HttpStatus.NOT_FOUND);
            }
            return {
                rows, count
            }
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<Menu> {
        try {
            const menu =  await this.repo.findOneBy({id});
            if(!menu){
                throw new HttpException('Menu is not Found',HttpStatus.NOT_FOUND);
            }
            return menu;
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, dto: UpdateMenuDto):Promise<Menu> {
        try {
            const menu = await this.getById(id);
            
            menu.description = dto.description || menu.description;
            menu.title = dto.title || menu.title;
            menu.price = dto.price || menu.price;
            menu.img = dto.img || menu.img;

            await this.repo.update({id}, menu);

            return menu;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string){
        try {
            const menu = await this.repo.findOneBy({id});
            if(!menu){
                throw new HttpException('Menu is Not Found',HttpStatus.NOT_FOUND);
            }
            await this.repo.delete({id});

            return { id };
        } catch (error) {
            throw error;
        }
    }
}
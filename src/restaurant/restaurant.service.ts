import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { RestaurantCreateDto } from './dto/restaurant-create.dto';
import { LookupQueryDto } from './dto/restaurant-lookup.dto';
import { WifiEnum } from 'src/enums/restaurant.enum';

@Injectable()
export class ResturantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly repo: Repository<Restaurant>,
  ) {}

  async create(dto: RestaurantCreateDto, user: User): Promise<Restaurant> {
    try {
      // email control
      const restaurant = await this.repo.findOne({
        where: [
          {
            email: dto.email,
          },
          {
            userId: user.id,
          },
        ],
      });
      if (restaurant && restaurant.email === dto.email) {
        throw new HttpException(
          'This Email is already exist from different restaurant',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (restaurant && restaurant.userId === user.id) {
        throw new HttpException(
          'You cannot open a restaurant for the second time.',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.repo.save({
        ...dto,
        userId: user.id,
      });
    } catch (error) {
      throw error;
    }
  }

  async lookup(dto:LookupQueryDto){
    try {
      const query:any = {};
      {
        const where: any = {};
        if(dto.offset)
          query.skip = dto.offset;
        if(dto.limit)
          query.take = dto.limit;
        if(dto.id){
          where.id = dto.id;
        }
        if(dto.wifi) {
          if(dto.wifi === WifiEnum.YES) {
            where.isWifi = true;
          } else {
            where.isWifi = false;
          }
        }
        if(dto.type){
          where.type = dto.type;
        }
        query.where = where;
      }
      const [rows,count] =  await this.repo.findAndCount(query);

      return {
        rows,
        count
      };
    } catch (error) {
      throw error;
    }
  }
  async restaurantMe(user:User){
    try {
      return await this.repo.findOne({
        where:{
          userId:user.id
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

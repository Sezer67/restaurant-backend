import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ResturantService } from './restaurant.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/user.enum';
import { RestaurantCreateDto } from './dto/restaurant-create.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly service: ResturantService) {}

  @UseGuards(AuthGuard('user'), RolesGuard)
  @Roles(Role.Restaurant)
  @Post()
  create(@Body() dto: RestaurantCreateDto, @Req() req: any) {
    return this.service.create(dto, req.user);
  }
}
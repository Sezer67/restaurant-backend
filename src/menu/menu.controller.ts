import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/user.enum";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";

@Controller('menu')
export class MenuController {
    constructor(
        private readonly service: MenuService
    ){}

    @Post('create')
    @UseGuards(AuthGuard('user'), RolesGuard)
    @Roles(Role.Restaurant)
    createMenu(@Body() dto: CreateMenuDto ,@Req() req: any){
        return this.service.create(dto, req.user);
    }

    @Get('restaurant/:restaurantId')
    getByRestaurantMenus(@Param('restaurantId') id: string) {
        return this.service.getRestaurantMenuById(id);
    }

    @Get(':id')
    getMenuById(@Param('id') id: string) {
        return this.service.getById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('user'),RolesGuard)
    @Roles(Role.Restaurant)
    updateMenu(@Param('id') id:string, @Body() dto: UpdateMenuDto){
        return this.service.update(id, dto);
    }

}
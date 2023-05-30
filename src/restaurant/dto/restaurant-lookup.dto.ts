import { Transform, Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { RestaurantType } from "src/enums/restaurant.enum";

export class LookupQueryDto {
    @IsOptional()
    @Type(() => Number)
    @Transform(({value}) => +value)
    @IsNumber()
    offset?:number;

    @IsOptional()
    @Type(() => Number)
    @Transform(({value}) => +value)
    @IsNumber()
    limit?:number;

    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    wifi?: string; // yes or no

    @IsOptional()
    @Type(() => Number)
    @Transform(({value}) => +value)
    @IsEnum(RestaurantType)
    type?: RestaurantType;

}

export class SearchQueryDto {
    @IsOptional()
    @IsString()
    name?: string;
}
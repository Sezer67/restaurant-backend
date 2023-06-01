import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateMenuDto {

    @IsNotEmpty()
    @IsString()
    restaurantId: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    img?: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
}
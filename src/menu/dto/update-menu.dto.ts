import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateMenuDto {

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    img?: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    price?: number;
}
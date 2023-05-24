import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

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

}
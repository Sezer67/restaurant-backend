import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

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

}
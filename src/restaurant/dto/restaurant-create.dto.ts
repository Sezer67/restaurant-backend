import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RestaurantType } from 'src/enums/restaurant.enum';

export class RestaurantCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isWifi: boolean;

  @IsNotEmpty()
  @IsEnum(RestaurantType)
  type: RestaurantType;

  @IsOptional()
  @IsString()
  img?: string;
}

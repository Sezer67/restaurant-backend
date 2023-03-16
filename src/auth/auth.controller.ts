import { Body, Post, Controller } from '@nestjs/common';
import { UserCreateDto } from 'src/user/dto/user-create.dto';
import { LoginBodyDto } from 'src/user/dto/user-login.dto';
// import { ILoginResponse } from 'src/shared/interfaces/user.interface';
// import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: UserService) {}

  @Post('/login')
  async login(@Body() dto: LoginBodyDto) {
    return this.service.login(dto);
  }

  @Post('/register')
  async register(@Body() dto: UserCreateDto) {
    return this.service.register(dto);
  }
}

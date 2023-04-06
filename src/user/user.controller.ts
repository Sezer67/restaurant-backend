import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard('user'))
  get(@Req() req: any) {
    return req.user;
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto:ForgotPasswordDto){
    return this.service.forgotPassword(dto);
  }
}

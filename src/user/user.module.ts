import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserStrategy } from 'src/auth/auth.strategy';
import { MailModule } from 'src/mail/mail.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({}),MailModule],
  controllers: [UserController],
  providers: [UserService, JwtService, UserStrategy],
  exports: [JwtModule],
})
export class UserModule {}

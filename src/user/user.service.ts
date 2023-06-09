import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { IJwtPayload } from 'src/interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginBodyDto } from './dto/user-login.dto';
import { ILoginResponse } from 'src/interfaces/user.interface';
import { UserCreateDto } from './dto/user-create.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/enums/user.enum';
import { ForgotPasswordDto, NewPasswordDto } from './dto/forgot-password.dto';
import { MailService } from 'src/mail/mail.service';
import { ContactAdminDto } from './dto/contact-admin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.repo.findOneBy({ id });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginBodyDto): Promise<ILoginResponse> {
    try {
      const user = await this.repo.findOne({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        throw new HttpException(
          'This Email is not registered',
          HttpStatus.BAD_REQUEST,
        );
      }

      const passCheck = await bcrypt.compare(dto.password, user.password);

      if (!passCheck) {
        throw new HttpException('Password is wrong', HttpStatus.FORBIDDEN);
      }

      const jwtPayload: IJwtPayload = {
        id: user.id,
        email: user.email,
      };

      const token = await this.jwtService.signAsync(jwtPayload, {
        algorithm: 'HS256',
        secret: process.env.JWT_SECRET,
      });

      delete user.password;

      return {
        user,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async register(dto: UserCreateDto) {
    try {
      // email kontrolü
      const user = await this.repo.findOne({
        where: {
          email: dto.email,
        },
      });
      if (user) {
        throw new HttpException(
          'This Email is already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      // password crypt
      const hash = await bcrypt.hash(dto.password, 10);
      dto.password = hash;

      const newUser = await this.repo.save(dto);

      delete newUser.password;
      await this.mailService.sendRegisterSuccessMail(newUser);

      // eğer kullanıcı restaurant işletecekse token üretilip gönderilmeli


      if(dto.role === Role.Restaurant){
        const jwtPayload: IJwtPayload = {
          id: newUser.id,
          email: newUser.email,
        };
  
        const token = await this.jwtService.signAsync(jwtPayload, {
          algorithm: 'HS256',
          secret: process.env.JWT_SECRET,
        });
        return {
          user:newUser,
          token
        }
      }

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(dto:ForgotPasswordDto){
    try {
      const user = await this.repo.findOne({
        where:{
          email: dto.email
        }
      });
      if(!user){
        throw new HttpException('Email is not found',400);
      }

      const jwtPayload: IJwtPayload = {
        id: user.id,
        email: user.email,
      };

      const token = await this.jwtService.signAsync(jwtPayload, {
        algorithm: 'HS256',
        secret: process.env.JWT_SECRET,
      });

      return await this.mailService.sendPasswordForgotMail(user,token);
      
    } catch (error) {
      throw error;
    }
  }

  async newPassword(dto: NewPasswordDto,user: User){
    try {

      const passCheck = await bcrypt.compare(dto.password, user.password);

      if(passCheck){
        throw new HttpException('Your new password cannot be the same as your old password.',HttpStatus.BAD_REQUEST);
      }

      const hash = await bcrypt.hash(dto.password, 10);
      user.password = hash;

      await this.repo.save(user);

      return {
        message: "success"
      };
    } catch (error) {
      throw error;
    }
  }

  async contactAdmin(dto: ContactAdminDto){
    try {
      return await this.mailService.contactAdmin(dto);
    } catch (error) {
      throw error;
    }
  }
}

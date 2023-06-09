import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ContactAdminDto } from 'src/user/dto/contact-admin.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendPasswordForgotMail(user: User, token: string) {
    try {
      const url = process.env.CLIENT_URL + '/forgotPassword?token=' + token;

      await this.mailService.sendMail({
        to: user.email,
        subject: 'Yeni Şifre Oluştur',
        template: './forgot-password',
        context: {
          name: user.fullName,
          url,
        },
      });

      return {
        message: 'success',
      };
    } catch (error) {
      throw error;
    }
  }

  async sendRegisterSuccessMail(user: User) {
    try {
      await this.mailService.sendMail({
        to: user.email,
        subject: 'Kaydınız Başarıyla Oluşturuldu',
        template: './register-success',
        context: {
          name: user.fullName,
          mail: user.email,
        },
      });

      return {
        message: 'success',
      };
    } catch (error) {
      return ;
    }
  }

  async contactAdmin(data: ContactAdminDto) {
    try {
      await this.mailService.sendMail({
        to: process.env.ADMIN_MAIL,
        subject: data.subject,
        template: './contact-admin',
        context: {
          ...data
        },
      });

      return {
        message: 'success',
      };
    } catch (error) {
      
    }
  }

}

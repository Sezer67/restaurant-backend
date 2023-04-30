import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
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
}

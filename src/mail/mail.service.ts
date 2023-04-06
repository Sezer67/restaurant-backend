import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";

@Injectable()
export class MailService {
    constructor (private mailService:MailerService){}

    async sendPasswordForgotMail(user:User) {
        try {
            console.log("mail service mail : ",user.email);
            await this.mailService.sendMail({
                to: user.email,
                subject: 'Yeni Şifre Oluştur',
                template: './forgot-password',
                context:{
                    name: user.fullName,
                    url: process.env.CLIENT_URL + "/forgotPassword"
                }
            });

            return {
                message:'success'
            }
        } catch (error) {
            throw error;
        }
    }

}
import { MailerModule } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";
import { MailService } from "./mail.service";

@Global()
@Module({
    imports:[
        MailerModule.forRootAsync({
            useFactory: async(config:ConfigService) => ({
                transport: {
                    host: config.get('MAIL_HOST'),
                    port: config.get('MAIL_PORT'),
                    auth: {
                        user: config.get('MAIL_USER'),
                        pass: config.get('MAIL_PASS')
                    }
                },
                defaults:{
                    from: config.get('MAIL_ADDRESS_FROM')
                },
                template:{
                    dir: join(__dirname,'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers:[MailService],
    exports:[MailService]
})

export class MailModule {}
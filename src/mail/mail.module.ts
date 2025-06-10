import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { join } from 'path';
import {
  Subcriber,
  SubcriberSchema,
} from 'src/subcribers/schema/subcriber.schema';
import { Jobs, JobsSchema } from 'src/jobs/schema/job.schema';
import { JobsModule } from 'src/jobs/jobs.module';
import { SubcribersModule } from 'src/subcribers/subcribers.module';
import { Company, CompanySchema } from 'src/companies/schemas/company.schema';

@Module({
  controllers: [MailController],
  providers: [MailService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Subcriber.name, schema: SubcriberSchema },
      { name: Jobs.name, schema: JobsSchema },
      { name: Company.name, schema: CompanySchema },
    ]),
    JobsModule,
    SubcribersModule,

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SENDER_EMAIL'),
          port: 587,
          secure: false,
          logger: true,
          auth: {
            user: configService.get('EMAIL_AUTH_USER'),
            pass: configService.get('EMAIL_AUTH_PASS'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@example.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        preview: configService.get('EMAIL_PREVIEW'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MailModule {}

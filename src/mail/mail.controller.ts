import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { MailService } from './mail.service';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Jobs, JobsDocument } from 'src/jobs/schema/job.schema';
import {
  Subcriber,
  SubcriberDocument,
} from 'src/subcribers/schema/subcriber.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/user.interface';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,
    @InjectModel(Subcriber.name)
    private readonly subcriberModel: SoftDeleteModel<SubcriberDocument>,
    @InjectModel(Jobs.name)
    private readonly jobModel: SoftDeleteModel<JobsDocument>,
  ) {}

  @Get('send')
  @Public()
  @ResponseMessage('Send test email')
  public async sendMail(): Promise<void> {
    const subcribers = await this.subcriberModel.find({});
    for (const subs of subcribers) {
      const subsSkills = subs.skills;
      //  Toán tử $in trả về các document mà trường (field) có ít nhất một giá trị khớp với một phần tử trong mảng
      const jobWithMathchingSkills = await this.jobModel.find({
        skills: { $in: subsSkills },
      });

      if (jobWithMathchingSkills?.length) {
        const jobs = jobWithMathchingSkills.map((item) => {
          return {
            name: item.name || 'No name',
            company: item.company?.name || 'Unknown',
            salary: `${String(item.salary).replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ',',
            )} đ`,
            skills: item.skills || [],
          };
        });

        console.log('>>>> Jobs for email:', jobs);

        await this.mailerService.sendMail({
          to: 'vuhuy1262@gmail.com',
          from: 'noreply@nestjs.com',
          subject: 'Testing Nest MailerModule ✔',
          text: 'welcome',
          template: 'register',
          context: {
            name: subs.name,
            jobs,
          },
        });
      }
    }
  }

  @Post()
  create(@Body() createMailDto: CreateMailDto) {
    return this.mailService.create(createMailDto);
  }

  @Get()
  findAll() {
    return this.mailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailService.remove(+id);
  }
}

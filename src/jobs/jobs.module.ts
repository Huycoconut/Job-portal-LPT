import { Jobs } from './schema/job.schema';
import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobsSchema } from './schema/job.schema';
import { MongooseModule, Schema } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Jobs.name, schema: JobsSchema }]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}

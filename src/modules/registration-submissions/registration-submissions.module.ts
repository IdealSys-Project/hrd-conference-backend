import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationSubmission } from 'src/entity/registration-submissions.entity';
import { RegistrationSubmissionController } from './registration-submissions.controller';
import { RegistrationSubmissionService } from './registration-submissions.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationSubmission])],
  controllers: [RegistrationSubmissionController],
  providers: [RegistrationSubmissionService],
})
export class RegistrationSubmissionModule {}

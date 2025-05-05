import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistrationSubmissionDto } from './registration-submissions.dto';
import { RegistrationSubmission } from 'src/entity/registration-submissions.entity';
import sendEmail from 'src/helper/send-email';

@Injectable()
export class RegistrationSubmissionService {
  private readonly logger = new Logger(RegistrationSubmissionService.name);

  constructor(
    @InjectRepository(RegistrationSubmission)
    private readonly registrationSubmission: Repository<RegistrationSubmission>,
  ) {}

  async createSubmission(
    data: CreateRegistrationSubmissionDto,
  ): Promise<{ status: boolean; message: string }> {
    try {
      await this.registrationSubmission.save(data);
      this.logger.log(`Submission created successfully`);

      this.logger.log(`Sending email to: ${'hashimisharudin.work@gmail.com'}`);
      await sendEmail({
        to: 'hashimisharudin.work@gmail.com',
        subject: 'TEST',
        template: 'registration-submissions',
        templateData: data,
      });

      return {
        status: true,
        message: 'Registered successfully! We’ll get back to you soon.',
      };
    } catch (error) {
      this.logger.error(`Error creating submission: ${error.message}`);
      throw new InternalServerErrorException(
        `There was a problem with your registration: ${error.message}`,
      );
    }
  }

  async getAllSubmissions(): Promise<RegistrationSubmission[]> {
    this.logger.log('Fetching all submissions');
    return await this.registrationSubmission.find();
  }
}

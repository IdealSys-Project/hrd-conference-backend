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
import {
  generateResponse,
  ResponsePayload,
} from 'src/helper/generate-response';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RegistrationSubmissionService {
  private readonly logger = new Logger(RegistrationSubmissionService.name);

  constructor(
    @InjectRepository(RegistrationSubmission)
    private readonly submissionRepo: Repository<RegistrationSubmission>,
  ) {}

  async create(
    data: CreateRegistrationSubmissionDto,
  ): Promise<ResponsePayload> {
    try {
      await sendEmail({
        to: ['admin@roomofleaders.com', 'areez@roomofleaders.com'],
        subject: `New Registration Submission: ${data.fullName}`,
        template: 'registration-submissions',
        templateData: data,
      });
      this.logger.log(`Submission created successfully`);

      return generateResponse(
        true,
        'Registered successfully! We’ll get back to you soon.',
      );
    } catch (error) {
      this.logger.error(`Error creating submission: ${error.message}`);
      throw new InternalServerErrorException(
        `There was a problem with your registration: ${error.message}`,
      );
    }
  }

  async getAll(): Promise<ResponsePayload> {
    try {
      const submissions = await this.submissionRepo.find();
      return generateResponse(true, 'Fetched all submissions', submissions);
    } catch (error) {
      this.logger.error(`Error fetching submissions: ${error.message}`);
      throw new InternalServerErrorException(`Error fetching data`);
    }
  }

  async getById(id: number): Promise<RegistrationSubmission | null> {
    this.logger.log(`Fetching submission: ${id}`);
    return await this.submissionRepo.findOne({ where: { id } });
  }

  async update(
    id: number,
    data: Partial<CreateRegistrationSubmissionDto>,
  ): Promise<ResponsePayload> {
    try {
      await this.submissionRepo.update(id, data);
      return generateResponse(true, 'Updated successfully!');
    } catch (error) {
      this.logger.error(`Update error: ${error.message}`);
      throw new InternalServerErrorException(
        `Issue updating: ${error.message}`,
      );
    }
  }

  async delete(id: number): Promise<ResponsePayload> {
    try {
      await this.submissionRepo.delete(id);
      this.logger.log(`Deleted submission: ${id}`);
      return generateResponse(true, 'Deleted successfully!');
    } catch (error) {
      this.logger.error(`Delete error: ${error.message}`);
      throw new InternalServerErrorException(
        `Issue deleting: ${error.message}`,
      );
    }
  }
}

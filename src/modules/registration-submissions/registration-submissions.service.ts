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
    private readonly configService: ConfigService,
  ) {}

  async create(
    data: CreateRegistrationSubmissionDto,
  ): Promise<ResponsePayload> {
    try {
      const existingSubmission = await this.submissionRepo.count({
        where: { email: data.email },
      });

      if (existingSubmission > 0) {
        throw new InternalServerErrorException(
          `Email ${data.email} is already registered.`,
        );
      }

      const newSubmission = await this.submissionRepo.save(data);
      this.logger.log(`Submission created successfully`);

      const recipientEmail =
        this.configService.get<string>('EMAIL_RECIPIENT') || 'default';

      this.logger.log(`Sending email to: ${recipientEmail}`);
      await sendEmail({
        to: recipientEmail,
        subject: `New Registration Submission: ${data.fullName}`,
        template: 'registration-submissions',
        templateData: data,
      });

      return generateResponse(true, 'Registered successfully!', newSubmission);
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
      return generateResponse(true, 'Updated successfully!', { id, data });
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
      return generateResponse(true, 'Deleted successfully!', { id });
    } catch (error) {
      this.logger.error(`Delete error: ${error.message}`);
      throw new InternalServerErrorException(
        `Issue deleting: ${error.message}`,
      );
    }
  }
}

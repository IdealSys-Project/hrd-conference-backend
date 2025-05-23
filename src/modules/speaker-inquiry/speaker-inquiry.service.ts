import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpeakerInquiry } from 'src/entity/speaker-inquiry';
import { Repository } from 'typeorm';
import { CreateSpeakerInquiryDto } from './speaker-inquiry.dto';
import sendEmail from 'src/helper/send-email';
import { ConfigService } from '@nestjs/config';
import {
  generateResponse,
  ResponsePayload,
} from 'src/helper/generate-response';

@Injectable()
export class SpeakerInquiryService {
  private readonly logger = new Logger(SpeakerInquiryService.name);

  constructor(
    @InjectRepository(SpeakerInquiry)
    private readonly speakerInquiryRepo: Repository<SpeakerInquiry>,
  ) {}

  async create(data: CreateSpeakerInquiryDto): Promise<ResponsePayload> {
    try {
      await this.speakerInquiryRepo.save(data);
      await sendEmail({
        to: ['admin@roomofleaders.com', 'adam@roomofleaders.com'],
        subject: 'Speaker Inquiry Submission',
        template: 'speaker-email',
        templateData: data,
      });

      return generateResponse(
        true,
        'Your speaker application has been successfully submitted and stored in our database.',
      );
    } catch (error) {
      this.logger.error(`Error creating submission: ${error.message}`);
      throw new InternalServerErrorException(
        `There was a problem storing your application: ${error.message}`,
      );
    }
  }

  async getAll(): Promise<ResponsePayload> {
    try {
      const submissions = await this.speakerInquiryRepo.find();
      return generateResponse(
        true,
        'Fetched all speakers inquiry',
        submissions,
      );
    } catch (error) {
      this.logger.error(`Error fetching speakers inquiry: ${error.message}`);
      throw new InternalServerErrorException(`Error fetching speakers inquiry`);
    }
  }
}

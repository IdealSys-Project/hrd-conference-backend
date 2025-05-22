import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SponsorshipInquiry } from 'src/entity/sponsorship-inquiry.entity';
import { Repository } from 'typeorm';
import { CreateSponsorshipInquiryDto } from './sponsorship-inquiry.dto';
import sendEmail from 'src/helper/send-email';
import {
  generateResponse,
  ResponsePayload,
} from 'src/helper/generate-response';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SponsorshipInquiryService {
  private readonly logger = new Logger(SponsorshipInquiryService.name);
  constructor(
    @InjectRepository(SponsorshipInquiry)
    private readonly sponsorshipInquiryRepo: Repository<SponsorshipInquiry>,
  ) {}

  async create(data: CreateSponsorshipInquiryDto): Promise<ResponsePayload> {
    try {
      await this.sponsorshipInquiryRepo.save(data);

      await sendEmail({
        to: ['admin@roomofleaders.com', 'abdul@roomofleaders.com'],
        subject: 'Sponsorship Inquiry Submission',
        template: 'sponsorship-email',
        templateData: data,
      });
      this.logger.log(`Sponsosrhip inquiry created successfully`);

      return generateResponse(
        true,
        'Your sponsorship inquiry has been successfully submitted and stored in our database.',
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `There was a problem storing your inquiry: ${error.message}`,
      );
    }
  }

  async getAll(): Promise<ResponsePayload> {
    try {
      const submissions = await this.sponsorshipInquiryRepo.find();
      return generateResponse(
        true,
        'Fetched all sponsorship inquiry',
        submissions,
      );
    } catch (error) {
      this.logger.error(`Error fetching sponsorship inquiry: ${error.message}`);
      throw new InternalServerErrorException(
        `Error fetching sponsorship inquiry`,
      );
    }
  }
}

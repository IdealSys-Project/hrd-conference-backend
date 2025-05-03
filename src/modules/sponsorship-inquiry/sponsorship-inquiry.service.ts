import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SponsorshipInquiry } from 'src/entity/sponsorship-inquiry.entity';
import { Repository } from 'typeorm';
import { CreateSponsorshipInquiryDto } from './sponsorship-inquiry.dto';

@Injectable()
export class SponsorshipInquiryService {
  constructor(
    @InjectRepository(SponsorshipInquiry)
    private readonly sponsorshipInquiry: Repository<SponsorshipInquiry>,
  ) {}

  async createInquiry(
    data: CreateSponsorshipInquiryDto,
  ): Promise<{ status: boolean; message: string }> {
    try {
      await this.sponsorshipInquiry.save(data);
      return {
        status: true,
        message:
          'Your sponsorship inquiry has been successfully submitted and stored in our database.',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `There was a problem storing your inquiry: ${error.message}`,
      );
    }
  }

  async getAllInquiries(): Promise<SponsorshipInquiry[]> {
    return await this.sponsorshipInquiry.find();
  }
}

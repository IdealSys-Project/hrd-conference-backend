import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpeakerInquiry } from 'src/entity/speaker-inquiry';
import { Repository } from 'typeorm';
import { CreateSpeakerInquiryDto } from './speaker-inquiry.dto';
import sendEmail from 'src/helper/send-email';

@Injectable()
export class SpeakerInquiryService {
  constructor(
    @InjectRepository(SpeakerInquiry)
    private readonly speakerInquiry: Repository<SpeakerInquiry>,
  ) {}

  async createInquiry(
    data: CreateSpeakerInquiryDto,
  ): Promise<{ status: boolean; message: string }> {
    try {
      await this.speakerInquiry.save(data);
      await sendEmail({
        to: 'hashimisharudin.work@gmail.com',
        subject: 'TEST',
        template: 'speaker-email',
        templateData: data,
      });
      return {
        status: true,
        message:
          'Your speaker application has been successfully submitted and stored in our database.',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `There was a problem storing your application: ${error.message}`,
      );
    }
  }

  async getAllInquiries(): Promise<SpeakerInquiry[]> {
    return await this.speakerInquiry.find();
  }
}

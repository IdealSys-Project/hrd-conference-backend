import { Body, Controller, Post, Get } from '@nestjs/common';
import { SpeakerInquiryService } from './speaker-inquiry.service';
import { CreateSpeakerInquiryDto } from './speaker-inquiry.dto';

@Controller('speaker-inquiries')
export class SpeakerInquiryController {
  constructor(private readonly service: SpeakerInquiryService) {}

  @Post()
  async create(@Body() data: CreateSpeakerInquiryDto) {
    return this.service.createInquiry(data);
  }

  @Get()
  async findAll() {
    return this.service.getAllInquiries();
  }
}

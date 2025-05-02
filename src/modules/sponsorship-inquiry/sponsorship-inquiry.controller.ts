import { Body, Controller, Get, Post } from '@nestjs/common';
import { SponsorshipInquiryService } from './sponsorship-inquiry.service';
import { CreateSponsorshipInquiryDto } from './sponsorship-inquiry.dto';

@Controller('sponsorship-inquiries')
export class SponsorshipInquiryController {
  constructor(private readonly service: SponsorshipInquiryService) {}

  @Post()
  async create(@Body() data: CreateSponsorshipInquiryDto) {
    return this.service.createInquiry(data);
  }

  @Get()
  async findAll() {
    return this.service.getAllInquiries();
  }
}

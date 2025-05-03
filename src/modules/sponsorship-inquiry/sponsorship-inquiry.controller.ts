import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SponsorshipInquiryService } from './sponsorship-inquiry.service';
import { CreateSponsorshipInquiryDto } from './sponsorship-inquiry.dto';

@ApiTags('Sponsorship Inquiries')
@Controller('sponsorship-inquiries')
export class SponsorshipInquiryController {
  constructor(private readonly service: SponsorshipInquiryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sponsorship inquiry' })
  @ApiResponse({ status: 201, description: 'Inquiry successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async create(@Body() data: CreateSponsorshipInquiryDto) {
    return this.service.createInquiry(data);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all sponsorship inquiries' })
  @ApiResponse({ status: 200, description: 'List of sponsorship inquiries' })
  async findAll() {
    return this.service.getAllInquiries();
  }
}

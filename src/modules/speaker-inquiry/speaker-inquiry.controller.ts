import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SpeakerInquiryService } from './speaker-inquiry.service';
import { CreateSpeakerInquiryDto } from './speaker-inquiry.dto';

@ApiTags('Speaker Inquiries')
@Controller('speaker-inquiries')
export class SpeakerInquiryController {
  constructor(private readonly service: SpeakerInquiryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new speaker inquiry' })
  @ApiResponse({ status: 201, description: 'Inquiry successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async create(@Body() data: CreateSpeakerInquiryDto) {
    return this.service.createInquiry(data);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all speaker inquiries' })
  @ApiResponse({ status: 200, description: 'List of speaker inquiries' })
  async findAll() {
    return this.service.getAllInquiries();
  }
}

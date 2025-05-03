import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegistrationSubmissionService } from './registration-submissions.service';
import { CreateRegistrationSubmissionDto } from './registration-submissions.dto';

@ApiTags('Registration Submissions')
@Controller('registration-submissions')
export class RegistrationSubmissionController {
  constructor(private readonly service: RegistrationSubmissionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new registration submission' })
  @ApiResponse({ status: 201, description: 'Submission successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async create(@Body() data: CreateRegistrationSubmissionDto) {
    return this.service.createSubmission(data);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all registration submissions' })
  @ApiResponse({ status: 200, description: 'List of registration submissions' })
  async findAll() {
    return this.service.getAllSubmissions();
  }
}

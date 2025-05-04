import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { RegistrationSubmissionService } from './registration-submissions.service';
import { CreateRegistrationSubmissionDto } from './registration-submissions.dto';
import { BasicAuthGuard } from 'src/guards/basic-auth.guard';

@ApiTags('Registration Submissions')
@Controller('registration-submissions')
export class RegistrationSubmissionController {
  constructor(private readonly service: RegistrationSubmissionService) {}

  @Post()
  @UseGuards(BasicAuthGuard)
  @ApiSecurity('basic-auth')
  @ApiOperation({ summary: 'Create a new registration submission' })
  @ApiResponse({ status: 201, description: 'Submission successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async create(@Body() data: CreateRegistrationSubmissionDto) {
    return this.service.createSubmission(data);
  }

  @Get()
  @UseGuards(BasicAuthGuard)
  @ApiSecurity('basic-auth')
  @ApiOperation({ summary: 'Retrieve all registration submissions' })
  @ApiResponse({ status: 200, description: 'List of registration submissions' })
  async findAll() {
    return this.service.getAllSubmissions();
  }
}

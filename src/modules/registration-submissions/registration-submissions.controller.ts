import { Body, Controller, Post, Get } from '@nestjs/common';
import { RegistrationSubmissionService } from './registration-submissions.service';
import { CreateRegistrationSubmissionDto } from './registration-submissions.dto';

@Controller('registration-submissions')
export class RegistrationSubmissionController {
  constructor(private readonly service: RegistrationSubmissionService) {}

  @Post()
  async create(@Body() data: CreateRegistrationSubmissionDto) {
    return this.service.createSubmission(data);
  }

  @Get()
  async findAll() {
    return this.service.getAllSubmissions();
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegistrationSubmissionDto } from './registration-submissions.dto';
import { RegistrationSubmission } from 'src/entity/registration-submissions.entity';

@Injectable()
export class RegistrationSubmissionService {
  constructor(
    @InjectRepository(RegistrationSubmission)
    private readonly registrationSubmission: Repository<RegistrationSubmission>,
  ) {}

  async createSubmission(
    data: CreateRegistrationSubmissionDto,
  ): Promise<{ status: boolean; message: string }> {
    try {
      await this.registrationSubmission.save(data);
      return {
        status: true,
        message: 'Registered successfully! We’ll get back to you soon.',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `There was a problem with your registration: ${error.message}`,
      );
    }
  }

  async getAllSubmissions(): Promise<RegistrationSubmission[]> {
    return await this.registrationSubmission.find();
  }
}

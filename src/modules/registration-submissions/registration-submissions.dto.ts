import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  IsOptional,
} from 'class-validator';

@ApiTags('Registration Submission')
export class CreateRegistrationSubmissionDto {
  @ApiProperty({ description: 'Full name of the applicant' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  full_name: string;

  @ApiProperty({ description: 'Email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Company name' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  company: string;

  @ApiProperty({ description: 'Job title' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  job_title: string;

  @ApiProperty({ description: 'Contact number (Malaysia format)' })
  @IsPhoneNumber('MY')
  @IsNotEmpty()
  contact_number: string;

  @ApiPropertyOptional({ description: 'Optional promo code' })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  promo_code?: string;
}

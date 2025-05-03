import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
} from 'class-validator';

@ApiTags('Speaker Inquiry')
export class CreateSpeakerInquiryDto {
  @ApiProperty({ description: 'Full name of the applicant' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  fullName: string;

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
  jobTitle: string;

  @ApiProperty({ description: 'Contact number (Malaysia format)' })
  @IsPhoneNumber('MY')
  @IsNotEmpty()
  contactNumber: string;
}

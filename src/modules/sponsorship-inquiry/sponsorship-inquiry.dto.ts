import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  IsOptional,
} from 'class-validator';

@ApiTags('Sponsorship Inquiry')
export class CreateSponsorshipInquiryDto {
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

  @ApiProperty({ description: 'Area of interest' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  interest: string;

  @ApiPropertyOptional({ description: 'Optional promo code' })
  @IsOptional()
  @IsString()
  @Length(3, 20)
  promoCode?: string;
}

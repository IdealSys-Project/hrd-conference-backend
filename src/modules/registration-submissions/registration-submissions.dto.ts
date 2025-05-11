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
  @ApiProperty({ description: 'Full Name' })
  @IsString()
  @IsNotEmpty({ message: 'Full Name is required' })
  @Length(3, 100, { message: 'Full Name must be between 3 and 100 characters' })
  fullName: string;

  @ApiProperty({ description: 'Email Address' })
  @IsEmail({}, { message: 'Invalid Email Address format' })
  @IsNotEmpty({ message: 'Email Address is required' })
  email: string;

  @ApiProperty({ description: 'Company Name' })
  @IsString()
  @IsNotEmpty({ message: 'Company Name is required' })
  @Length(3, 100, {
    message: 'Company Name must be between 3 and 100 characters',
  })
  company: string;

  @ApiProperty({ description: 'Job Title' })
  @IsString()
  @IsNotEmpty({ message: 'Job Title is required' })
  @Length(2, 100, { message: 'Job Title must be between 2 and 100 characters' })
  jobTitle: string;

  @ApiProperty({ description: 'Contact Number' })
  @IsPhoneNumber('MY', { message: 'Invalid Contact Number format' })
  @IsNotEmpty({ message: 'Contact Number is required' })
  contactNumber: string;

  @ApiPropertyOptional({ description: 'Promo Code (Optional)' })
  @IsOptional()
  @IsString()
  promoCode?: string;
}

import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateSponsorshipInquiryDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  company: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  job_title: string;

  @IsPhoneNumber('MY')
  @IsNotEmpty()
  contact_number: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  interest: string;
}

import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateRegistrationSubmissionDto {
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

  @IsOptional()
  @IsString()
  @Length(3, 50)
  promo_code?: string;
}

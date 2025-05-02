import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateSpeakerInquiryDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  fullName: string;

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
  jobTitle: string;

  @IsPhoneNumber('MY')
  @IsNotEmpty()
  contactNumber: string;
}

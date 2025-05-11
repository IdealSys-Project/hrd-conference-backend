import { Module } from '@nestjs/common';
import { SponsorshipInquiryController } from './sponsorship-inquiry.controller';
import { SponsorshipInquiryService } from './sponsorship-inquiry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SponsorshipInquiry } from 'src/entity/sponsorship-inquiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SponsorshipInquiry])],
  controllers: [SponsorshipInquiryController],
  providers: [SponsorshipInquiryService],
})
export class SponsorshipInquiryModule {}

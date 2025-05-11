import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeakerInquiry } from 'src/entity/speaker-inquiry';
import { SpeakerInquiryController } from './speaker-inquiry.controller';
import { SpeakerInquiryService } from './speaker-inquiry.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpeakerInquiry])],
  controllers: [SpeakerInquiryController],
  providers: [SpeakerInquiryService],
})
export class SpeakerInquiryModule {}

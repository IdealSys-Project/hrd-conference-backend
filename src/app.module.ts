import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SponsorshipInquiryModule } from './modules/sponsorship-inquiry/sponsorship-inquiry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SponsorshipInquiry } from './entity/sponsorship-inquiry.entity';
import { ConfigModule } from '@nestjs/config';
import { RegistrationSubmission } from './entity/registration-submissions.entity';
import { RegistrationSubmissionModule } from './modules/registration-submissions/registration-submissions.module';
import { SnakecaseNamingStrategy } from './config/snakecase-naming-strategy';
import { SpeakerInquiry } from './entity/speaker-inquiry';
import { SpeakerInquiryModule } from './modules/speaker-inquiry/speaker-inquiry.module';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [SponsorshipInquiry, RegistrationSubmission, SpeakerInquiry],
      synchronize: true,
      retryAttempts: 3,
      namingStrategy: new SnakecaseNamingStrategy(),
      logging: ['error'],
    }),
    SponsorshipInquiryModule,
    RegistrationSubmissionModule,
    SpeakerInquiryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

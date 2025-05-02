import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SponsorshipInquiryModule } from './modules/sponsorship-inquiry/sponsorship-inquiry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SponsorshipInquiry } from './entity/sponsorship-inquiry.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
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
      entities: [SponsorshipInquiry],
      synchronize: false,
      retryAttempts: 2,
    }),
    SponsorshipInquiryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

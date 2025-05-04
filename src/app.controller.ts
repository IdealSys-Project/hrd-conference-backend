import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheck } from '@nestjs/terminus';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('/health')
  @HealthCheck()
  @ApiOperation({ summary: 'Check API & Database health status' })
  @ApiResponse({ status: 200, description: 'Health check successful' })
  @ApiResponse({ status: 500, description: 'Health check failed' })
  async check() {
    return this.service.check();
  }
}

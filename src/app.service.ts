import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class AppService {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
  ) {}

  async check() {
    return this.healthCheckService.check([
      () => this.db.pingCheck('database'), // Ensure database is reachable
      () =>
        this.memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024), // Heap usage check (150MB max)
      () =>
        this.memoryHealthIndicator.checkRSS('memory_rss', 250 * 1024 * 1024), // Resident Set Size (250MB max)
    ]);
  }
}

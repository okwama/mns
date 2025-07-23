import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { DatabaseHealthService } from '../../services/database-health.service';

@Module({
  controllers: [HealthController],
  providers: [DatabaseHealthService],
  exports: [DatabaseHealthService],
})
export class HealthModule {} 
import { Module } from '@nestjs/common';
import { ManagerPerformanceController } from './manager-performance.controller';
import { ManagerPerformanceService } from './manager-performance.service';

@Module({
  controllers: [ManagerPerformanceController],
  providers: [ManagerPerformanceService],
})
export class ManagerPerformanceModule {} 
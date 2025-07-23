import { Module } from '@nestjs/common';
import { SalesRepTargetPerformanceController } from './sales-rep-target-performance.controller';
import { SalesRepTargetPerformanceService } from './sales-rep-target-performance.service';

@Module({
  controllers: [SalesRepTargetPerformanceController],
  providers: [SalesRepTargetPerformanceService],
})
export class SalesRepTargetPerformanceModule {} 
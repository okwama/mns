import { Controller, Get, Query } from '@nestjs/common';
import { SalesRepTargetPerformanceService } from './sales-rep-target-performance.service';

@Controller('sales-rep-target-performance')
export class SalesRepTargetPerformanceController {
  constructor(private readonly service: SalesRepTargetPerformanceService) {}

  @Get()
  async getPerformance(
    @Query('salesRepId') salesRepId?: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getPerformance(salesRepId, from, to);
  }
} 
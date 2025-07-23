import { Controller, Get, Query, Param } from '@nestjs/common';
import { ManagerPerformanceService } from './manager-performance.service';


@Controller('manager-performance')
export class ManagerPerformanceController {
  constructor(private readonly service: ManagerPerformanceService) {}

  @Get()
  async getPerformance(
    @Query('managerId') managerId?: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getPerformance(managerId, from, to);
  }

  @Get('overview')
  async getOverview() {
    return this.service.getOverview();
  }

  @Get(':managerId/salesreps')
  async getManagerSalesReps(@Param('managerId') managerId: number) {
    return this.service.getManagerSalesReps(managerId);
  }
} 
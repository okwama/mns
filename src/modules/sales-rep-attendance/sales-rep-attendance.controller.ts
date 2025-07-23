import { Controller, Get, Query, Param } from '@nestjs/common';
import { SalesRepAttendanceService } from './sales-rep-attendance.service';

@Controller('sales-rep-attendance')
export class SalesRepAttendanceController {
  constructor(private readonly salesRepAttendanceService: SalesRepAttendanceService) {}

  @Get()
  async getAttendance(
    @Query('salesRepId') salesRepId?: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.salesRepAttendanceService.getAttendance(salesRepId, from, to);
  }

  @Get('today-summary')
  async getTodayAttendanceSummary() {
    return this.salesRepAttendanceService.getTodayAttendanceSummary();
  }

  @Get('all-sales-reps')
  async getAllSalesRepsWithAttendance() {
    return this.salesRepAttendanceService.getAllSalesRepsWithAttendance();
  }

  @Get('daily-attendance')
  async getDailyAttendance(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.salesRepAttendanceService.getDailyAttendanceForDateRange(from, to);
  }

  @Get('debug')
  async debugAttendanceData() {
    return this.salesRepAttendanceService.debugAttendanceData();
  }

  @Get(':id')
  async getAttendanceById(
    @Param('id') id: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const salesRepId = parseInt(id);
    if (isNaN(salesRepId)) {
      throw new Error('Invalid sales rep ID');
    }
    return this.salesRepAttendanceService.getAttendance(salesRepId, from, to);
  }
} 
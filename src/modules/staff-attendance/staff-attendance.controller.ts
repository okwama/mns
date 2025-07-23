import { Controller, Get, Param, Query } from '@nestjs/common';
import { StaffAttendanceService } from './staff-attendance.service';

@Controller('staff-attendance')
export class StaffAttendanceController {
  constructor(private readonly staffAttendanceService: StaffAttendanceService) {}

  @Get(':staffId')
  async getStaffAttendance(
    @Param('staffId') staffId: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.staffAttendanceService.getStaffAttendance(staffId, from, to);
  }

  @Get()
  async getAllStaffAttendance(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.staffAttendanceService.getStaffAttendance(undefined, from, to);
  }
} 
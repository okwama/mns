import { Module } from '@nestjs/common';
import { SalesRepAttendanceController } from './sales-rep-attendance.controller';
import { SalesRepAttendanceService } from './sales-rep-attendance.service';
import { HealthModule } from '../health/health.module';

@Module({
  imports: [HealthModule],
  controllers: [SalesRepAttendanceController],
  providers: [SalesRepAttendanceService],
})
export class SalesRepAttendanceModule {} 
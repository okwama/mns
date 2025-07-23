import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class StaffAttendanceService {
  constructor(private dataSource: DataSource) {}

  async getStaffAttendance(staffId?: number, from?: string, to?: string) {
    return this.dataSource.query('CALL get_staff_attendance(?, ?, ?)', [staffId ?? null, from ?? null, to ?? null]);
  }
} 
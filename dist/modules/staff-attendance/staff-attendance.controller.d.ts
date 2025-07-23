import { StaffAttendanceService } from './staff-attendance.service';
export declare class StaffAttendanceController {
    private readonly staffAttendanceService;
    constructor(staffAttendanceService: StaffAttendanceService);
    getStaffAttendance(staffId: number, from?: string, to?: string): Promise<any>;
    getAllStaffAttendance(from?: string, to?: string): Promise<any>;
}

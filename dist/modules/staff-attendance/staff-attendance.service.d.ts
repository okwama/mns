import { DataSource } from 'typeorm';
export declare class StaffAttendanceService {
    private dataSource;
    constructor(dataSource: DataSource);
    getStaffAttendance(staffId?: number, from?: string, to?: string): Promise<any>;
}

import { SalesRepAttendanceService } from './sales-rep-attendance.service';
export declare class SalesRepAttendanceController {
    private readonly salesRepAttendanceService;
    constructor(salesRepAttendanceService: SalesRepAttendanceService);
    getAttendance(salesRepId?: number, from?: string, to?: string): Promise<any>;
    getTodayAttendanceSummary(): Promise<{
        date: string;
        totalSalesReps: any;
        checkedInToday: number;
        notCheckedIn: number;
        attendanceRate: number;
        checkedInSalesReps: any[];
    }>;
    getAllSalesRepsWithAttendance(): Promise<{
        date: string;
        totalSalesReps: any;
        presentCount: any;
        absentCount: any;
        salesReps: any;
    }>;
    getDailyAttendance(from?: string, to?: string): Promise<any[]>;
    debugAttendanceData(): Promise<{
        date: string;
        tablesExist: {
            salesRep: boolean;
            loginHistory: boolean;
        };
        totalSalesReps: any;
        sampleSalesReps: null;
        todaySessions: null;
        recentSessions: null;
        error?: undefined;
        stack?: undefined;
    } | {
        error: any;
        stack: any;
        date?: undefined;
        tablesExist?: undefined;
        totalSalesReps?: undefined;
        sampleSalesReps?: undefined;
        todaySessions?: undefined;
        recentSessions?: undefined;
    }>;
    getAttendanceById(id: string, from?: string, to?: string): Promise<any>;
}

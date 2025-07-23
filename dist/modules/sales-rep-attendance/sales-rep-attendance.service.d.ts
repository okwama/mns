import { DataSource } from 'typeorm';
import { DatabaseHealthService } from '../../services/database-health.service';
export declare class SalesRepAttendanceService {
    private dataSource;
    private databaseHealthService;
    private readonly logger;
    constructor(dataSource: DataSource, databaseHealthService: DatabaseHealthService);
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
    getDailyAttendanceForDateRange(from?: string, to?: string): Promise<any[]>;
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
}

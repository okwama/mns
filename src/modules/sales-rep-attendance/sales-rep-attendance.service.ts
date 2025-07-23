import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseHealthService } from '../../services/database-health.service';

@Injectable()
export class SalesRepAttendanceService {
  private readonly logger = new Logger(SalesRepAttendanceService.name);

  constructor(
    private dataSource: DataSource,
    private databaseHealthService: DatabaseHealthService,
  ) {}

  async getAttendance(salesRepId?: number, from?: string, to?: string) {
    return this.databaseHealthService.executeWithRetry(async () => {
      try {
        // Validate salesRepId
        if (salesRepId !== undefined && (isNaN(salesRepId) || salesRepId <= 0)) {
          throw new Error('Invalid sales rep ID');
        }

        // Set default date range if not provided (last 30 days)
        const defaultTo = new Date().toISOString().split('T')[0];
        const defaultFrom = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        const fromDate = from || defaultFrom;
        const toDate = to || defaultTo;

        // Get the sales rep details
        const salesRepDetails = await this.dataSource.query(
          'SELECT id, name, email, phoneNumber, country, region, route FROM SalesRep WHERE id = ? AND status = 0',
          [salesRepId]
        );

        if (!salesRepDetails || salesRepDetails.length === 0) {
          throw new Error('Sales rep not found');
        }

        const salesRep = salesRepDetails[0];

        // Get attendance history for the date range
        const attendanceHistory = await this.dataSource.query(
          `SELECT 
            DATE(lh.sessionStart) as date,
            lh.sessionStart,
            lh.sessionEnd,
            CASE WHEN lh.sessionStart IS NOT NULL THEN 1 ELSE 0 END as isPresent
          FROM (
            SELECT DATE(?) + INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as date
            FROM (SELECT 0 as a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) as a
            CROSS JOIN (SELECT 0 as a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) as b
            CROSS JOIN (SELECT 0 as a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) as c
          ) as dates
          LEFT JOIN LoginHistory lh ON DATE(lh.sessionStart) = dates.date AND lh.userId = ?
          WHERE dates.date BETWEEN ? AND ?
          ORDER BY dates.date DESC`,
          [fromDate, salesRepId, fromDate, toDate]
        );

        // Format the attendance records
        const formattedHistory = attendanceHistory.map((record: any) => ({
          id: salesRep.id,
          userId: salesRep.id,
          name: salesRep.name,
          type: 'Sales Rep',
          date: record.date,
          isCheckedIn: record.isPresent === 1,
          status: record.isPresent === 1 ? '1' : '0',
          checkInTime: record.isPresent === 1 ? record.sessionStart : null,
          checkOutTime: record.isPresent === 1 ? record.sessionEnd : null,
          sessionStart: record.sessionStart,
          sessionEnd: record.sessionEnd,
          email: salesRep.email,
          phoneNumber: salesRep.phoneNumber,
          country: salesRep.country,
          region: salesRep.region,
          route: salesRep.route,
        }));

        return formattedHistory;
      } catch (error) {
        this.logger.error('Error in getAttendance:', error);
        throw new Error(`Failed to get attendance history: ${error.message}`);
      }
    });
  }

  async getTodayAttendanceSummary() {
    return this.databaseHealthService.executeWithRetry(async () => {
      try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
        // Get total active sales reps from SalesRep table
    const totalSalesReps = await this.dataSource.query(
          'SELECT COUNT(*) as total FROM SalesRep WHERE status = 0'
        );
        
        // Get today's sessionStart records to check who is present
        const todaySessions = await this.dataSource.query(
          'SELECT lh.userId, sr.name as sales_rep_name FROM LoginHistory lh JOIN SalesRep sr ON lh.userId = sr.id WHERE DATE(lh.sessionStart) = ?',
          [today]
        );
      
        // Extract unique sales reps who have sessionStart today
    const uniqueSalesReps = new Map();
        if (todaySessions && todaySessions.length > 0) {
          todaySessions.forEach((session: any) => {
        if (session.userId && session.sales_rep_name) {
          uniqueSalesReps.set(session.userId, {
            salesRepId: session.userId,
            salesRepName: session.sales_rep_name
          });
        }
      });
    }
    
    const checkedInToday = uniqueSalesReps.size;
    const checkedInSalesReps = Array.from(uniqueSalesReps.values());
    
    return {
      date: today,
      totalSalesReps: totalSalesReps[0]?.total || 0,
      checkedInToday: checkedInToday,
      notCheckedIn: (totalSalesReps[0]?.total || 0) - checkedInToday,
      attendanceRate: totalSalesReps[0]?.total > 0 
        ? Math.round((checkedInToday / totalSalesReps[0]?.total) * 100)
        : 0,
      checkedInSalesReps: checkedInSalesReps
    };
      } catch (error) {
        this.logger.error('Error in getTodayAttendanceSummary:', error);
        throw new Error('Failed to get today\'s attendance summary');
      }
    });
  }

  async getAllSalesRepsWithAttendance() {
    return this.databaseHealthService.executeWithRetry(async () => {
      try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        
        // Get all sales reps from SalesRep table
        const allSalesReps = await this.dataSource.query(
          'SELECT id, name, email, phoneNumber, country, region, route FROM SalesRep WHERE status = 0'
        );
        
        // Get today's sessionStart records to check who is present
        const todaySessions = await this.dataSource.query(
          'SELECT DISTINCT userId FROM LoginHistory WHERE DATE(sessionStart) = ?',
          [today]
        );
        
        // Create a set of sales rep IDs who have sessionStart today
        const presentSalesRepIds = new Set();
        if (todaySessions && todaySessions.length > 0) {
          todaySessions.forEach((session: any) => {
            if (session.userId) {
              presentSalesRepIds.add(session.userId);
            }
          });
        }
        
        // Map sales reps with their attendance status
        const salesRepsWithAttendance = allSalesReps.map((salesRep: any) => ({
          id: salesRep.id,
          name: salesRep.name,
          email: salesRep.email,
          phoneNumber: salesRep.phoneNumber,
          country: salesRep.country,
          region: salesRep.region,
          route: salesRep.route,
          isPresent: presentSalesRepIds.has(salesRep.id),
          status: presentSalesRepIds.has(salesRep.id) ? 'Present' : 'Absent'
        }));
        
        return {
          date: today,
          totalSalesReps: salesRepsWithAttendance.length,
          presentCount: salesRepsWithAttendance.filter((sr: any) => sr.isPresent).length,
          absentCount: salesRepsWithAttendance.filter((sr: any) => !sr.isPresent).length,
          salesReps: salesRepsWithAttendance
        };
      } catch (error) {
        this.logger.error('Error in getAllSalesRepsWithAttendance:', error);
        throw new Error('Failed to get all sales reps with attendance');
      }
    });
  }

  async getDailyAttendanceForDateRange(from?: string, to?: string) {
    return this.databaseHealthService.executeWithRetry(async () => {
      try {
        // Set default date range if not provided (last 7 days)
        const defaultTo = new Date().toISOString().split('T')[0];
        const defaultFrom = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        const fromDate = from || defaultFrom;
        const toDate = to || defaultTo;

        // Get all sales reps
        const allSalesReps = await this.dataSource.query(
          'SELECT id, name, email, phoneNumber, country, region, route FROM SalesRep WHERE status = 0'
        );

        // Get attendance data for the date range
        const attendanceData = await this.dataSource.query(
          `SELECT 
            lh.userId,
            DATE(lh.sessionStart) as date,
            lh.sessionStart,
            lh.sessionEnd
          FROM LoginHistory lh
          WHERE DATE(lh.sessionStart) BETWEEN ? AND ?
          ORDER BY lh.sessionStart DESC`,
          [fromDate, toDate]
        );

        // Create a map of attendance by date and sales rep
        const attendanceMap = new Map();
        
        // Initialize all dates and sales reps as absent
        const currentDate = new Date(fromDate);
        const endDate = new Date(toDate);
        
        while (currentDate <= endDate) {
          const dateStr = currentDate.toISOString().split('T')[0];
          attendanceMap.set(dateStr, new Map());
          
          allSalesReps.forEach((salesRep: any) => {
            attendanceMap.get(dateStr).set(salesRep.id, {
              id: salesRep.id,
              userId: salesRep.id,
              name: salesRep.name,
              type: 'Sales Rep',
              date: dateStr,
              isCheckedIn: false,
              status: '0',
              checkInTime: null,
              checkOutTime: null,
              sessionStart: null,
              sessionEnd: null,
              email: salesRep.email,
              phoneNumber: salesRep.phoneNumber,
              country: salesRep.country,
              region: salesRep.region,
              route: salesRep.route,
            });
          });
          
          currentDate.setDate(currentDate.getDate() + 1);
        }

        // Mark present sales reps
        attendanceData.forEach((record: any) => {
          const dateStr = record.date;
          if (attendanceMap.has(dateStr) && attendanceMap.get(dateStr).has(record.userId)) {
            const attendance = attendanceMap.get(dateStr).get(record.userId);
            attendance.isCheckedIn = true;
            attendance.status = '1';
            attendance.checkInTime = record.sessionStart;
            attendance.checkOutTime = record.sessionEnd;
            attendance.sessionStart = record.sessionStart;
            attendance.sessionEnd = record.sessionEnd;
          }
        });

        // Convert to flat array
        const result: any[] = [];
        for (const [date, salesRepMap] of attendanceMap) {
          for (const attendance of salesRepMap.values()) {
            result.push(attendance);
          }
        }

        return result;
      } catch (error) {
        this.logger.error('Error in getDailyAttendanceForDateRange:', error);
        throw new Error(`Failed to get daily attendance: ${error.message}`);
      }
    });
  }

  async debugAttendanceData() {
    return this.databaseHealthService.executeWithRetry(async () => {
      try {
    const today = new Date().toISOString().split('T')[0];
        
        // First, let's check if tables exist
        const tablesCheck = await this.dataSource.query('SHOW TABLES LIKE "SalesRep"');
        const loginHistoryCheck = await this.dataSource.query('SHOW TABLES LIKE "LoginHistory"');
    
    // Debug queries to see actual data
        let totalSalesReps = null;
        let allSalesReps = null;
        let todaySessions = null;
        let sessionHistorySample = null;
        
        if (tablesCheck.length > 0) {
          totalSalesReps = await this.dataSource.query('SELECT COUNT(*) as total FROM SalesRep WHERE status = 0');
          allSalesReps = await this.dataSource.query('SELECT id, name, email, status FROM SalesRep WHERE status = 0 LIMIT 10');
        }
        
        if (loginHistoryCheck.length > 0) {
          todaySessions = await this.dataSource.query('SELECT userId, sessionStart, sessionEnd FROM LoginHistory WHERE DATE(sessionStart) = ? LIMIT 10', [today]);
          sessionHistorySample = await this.dataSource.query('SELECT userId, sessionStart, sessionEnd FROM LoginHistory ORDER BY sessionStart DESC LIMIT 5');
        }
    
    return {
      date: today,
          tablesExist: {
            salesRep: tablesCheck.length > 0,
            loginHistory: loginHistoryCheck.length > 0
          },
          totalSalesReps: totalSalesReps && totalSalesReps[0] ? (totalSalesReps[0] as any).total : null,
      sampleSalesReps: allSalesReps,
      todaySessions: todaySessions,
      recentSessions: sessionHistorySample
    };
      } catch (error) {
        this.logger.error('Error in debugAttendanceData:', error);
        return {
          error: error.message,
          stack: error.stack
        };
      }
    });
  }
} 
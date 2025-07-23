import { DataSource } from 'typeorm';
export declare class ManagerPerformanceService {
    private dataSource;
    constructor(dataSource: DataSource);
    getPerformance(managerId?: number, from?: string, to?: string): Promise<any>;
    getOverview(): Promise<any>;
    getManagerSalesReps(managerId: number): Promise<any>;
}

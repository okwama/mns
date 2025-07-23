import { DataSource } from 'typeorm';
export declare class SalesRepTargetPerformanceService {
    private dataSource;
    constructor(dataSource: DataSource);
    getPerformance(salesRepId?: number, from?: string, to?: string): Promise<any>;
}

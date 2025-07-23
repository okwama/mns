import { ManagerPerformanceService } from './manager-performance.service';
export declare class ManagerPerformanceController {
    private readonly service;
    constructor(service: ManagerPerformanceService);
    getPerformance(managerId?: number, from?: string, to?: string): Promise<any>;
    getOverview(): Promise<any>;
    getManagerSalesReps(managerId: number): Promise<any>;
}

import { SalesRepTargetPerformanceService } from './sales-rep-target-performance.service';
export declare class SalesRepTargetPerformanceController {
    private readonly service;
    constructor(service: SalesRepTargetPerformanceService);
    getPerformance(salesRepId?: number, from?: string, to?: string): Promise<any>;
}

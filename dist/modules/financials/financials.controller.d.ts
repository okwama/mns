import { FinancialsService } from './financials.service';
export declare class FinancialsController {
    private readonly service;
    constructor(service: FinancialsService);
    getMonthlyTrends(from?: string, to?: string): Promise<unknown[]>;
    getTotalSales(from?: string, to?: string): Promise<{
        total_sales: number;
        from: string | undefined;
        to: string | undefined;
    }>;
    getBankBalances(): Promise<any>;
}

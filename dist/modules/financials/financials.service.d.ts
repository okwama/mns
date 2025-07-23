import { DataSource } from 'typeorm';
export declare class FinancialsService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getMonthlyTrends(from?: string, to?: string): Promise<unknown[]>;
    getTotalSales(from?: string, to?: string): Promise<{
        total_sales: number;
        from: string | undefined;
        to: string | undefined;
    }>;
    getBankBalances(): Promise<any>;
}

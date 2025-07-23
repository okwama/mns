import { DataSource } from 'typeorm';
import { DatabaseHealthService } from '../../services/database-health.service';
export declare class ProductDetailService {
    private dataSource;
    private databaseHealthService;
    private readonly logger;
    constructor(dataSource: DataSource, databaseHealthService: DatabaseHealthService);
    getProductDetail(productId?: number, from?: string, to?: string): Promise<any>;
    getProductTimeSeries(productId?: number, from?: string, to?: string): Promise<any>;
    getCategoryBreakdown(from?: string, to?: string): Promise<any>;
    getSalesRepBreakdown(from?: string, to?: string): Promise<any>;
    getTopProducts(from?: string, to?: string, limit?: number, by?: 'sales' | 'quantity'): Promise<any>;
    getCountryRegionBreakdown(from?: string, to?: string): Promise<any>;
    getClientBreakdown(from?: string, to?: string): Promise<any>;
    getStoreBreakdown(from?: string, to?: string): Promise<any>;
    getMonthlyBreakdown(from?: string, to?: string): Promise<any>;
    getPerformanceVsTarget(from?: string, to?: string): Promise<any>;
}

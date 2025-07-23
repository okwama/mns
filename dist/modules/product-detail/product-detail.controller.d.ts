import { ProductDetailService } from './product-detail.service';
export declare class ProductDetailController {
    private readonly service;
    constructor(service: ProductDetailService);
    getProductDetail(productId?: number, from?: string, to?: string): Promise<any>;
    getProductTimeSeries(productId?: number, from?: string, to?: string): Promise<any>;
    getCategoryBreakdown(from?: string, to?: string): Promise<any>;
    getSalesRepBreakdown(from?: string, to?: string): Promise<any>;
    getTopProducts(from?: string, to?: string, limit?: string, by?: 'sales' | 'quantity'): Promise<any>;
    getCountryRegionBreakdown(from?: string, to?: string): Promise<any>;
    getClientBreakdown(from?: string, to?: string): Promise<any>;
    getStoreBreakdown(from?: string, to?: string): Promise<any>;
    getMonthlyBreakdown(from?: string, to?: string): Promise<any>;
    getPerformanceVsTarget(from?: string, to?: string): Promise<any>;
}

import { DataSource } from 'typeorm';
export declare class InventoryService {
    private dataSource;
    constructor(dataSource: DataSource);
    getInventory(productId?: number, storeId?: number, countryId?: number): Promise<any>;
}

import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getInventory(productId?: number, storeId?: number, countryId?: number): Promise<any>;
}

import { Controller, Get, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async getInventory(
    @Query('productId') productId?: number,
    @Query('storeId') storeId?: number,
    @Query('countryId') countryId?: number,
  ) {
    return this.inventoryService.getInventory(productId, storeId, countryId);
  }
} 
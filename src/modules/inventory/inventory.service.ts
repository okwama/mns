import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(private dataSource: DataSource) {}

  async getInventory(productId?: number, storeId?: number, countryId?: number) {
    return this.dataSource.query('CALL get_inventory_availability(?, ?, ?)', [productId ?? null, storeId ?? null, countryId ?? null]);
  }
} 
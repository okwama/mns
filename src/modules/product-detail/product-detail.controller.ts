import { Controller, Get, Query } from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';

@Controller('product-detail')
export class ProductDetailController {
  constructor(private readonly service: ProductDetailService) {}

  @Get()
  async getProductDetail(
    @Query('productId') productId?: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getProductDetail(productId, from, to);
  }

  @Get('timeseries')
  async getProductTimeSeries(
    @Query('productId') productId?: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getProductTimeSeries(productId, from, to);
  }

  @Get('category-breakdown')
  async getCategoryBreakdown(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getCategoryBreakdown(from, to);
  }

  @Get('salesrep-breakdown')
  async getSalesRepBreakdown(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getSalesRepBreakdown(from, to);
  }

  @Get('top')
  async getTopProducts(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limit?: string,
    @Query('by') by?: 'sales' | 'quantity',
  ) {
    let parsedLimit = 10;
    if (limit) {
      const num = parseInt(limit, 10);
      if (!isNaN(num) && num > 0 && num <= 100) {
        parsedLimit = num;
      }
    }
    return this.service.getTopProducts(from, to, parsedLimit, by);
  }

  @Get('country-region-breakdown')
  async getCountryRegionBreakdown(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getCountryRegionBreakdown(from, to);
  }

  @Get('client-breakdown')
  async getClientBreakdown(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getClientBreakdown(from, to);
  }

  @Get('store-breakdown')
  async getStoreBreakdown(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getStoreBreakdown(from, to);
  }

  @Get('monthly-breakdown')
  async getMonthlyBreakdown(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getMonthlyBreakdown(from, to);
  }

  @Get('performance-vs-target')
  async getPerformanceVsTarget(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getPerformanceVsTarget(from, to);
  }
} 
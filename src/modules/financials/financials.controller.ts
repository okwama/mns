import { Controller, Get, Query } from '@nestjs/common';
import { FinancialsService } from './financials.service';

@Controller('financials')
export class FinancialsController {
  constructor(private readonly service: FinancialsService) {}

  @Get('monthly-trends')
  async getMonthlyTrends(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getMonthlyTrends(from, to);
  }

  @Get('total-sales')
  async getTotalSales(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getTotalSales(from, to);
  }

  @Get('bank-balances')
  async getBankBalances() {
    return this.service.getBankBalances();
  }
} 
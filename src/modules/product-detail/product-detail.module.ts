import { Module } from '@nestjs/common';
import { ProductDetailController } from './product-detail.controller';
import { ProductDetailService } from './product-detail.service';
import { HealthModule } from '../health/health.module';

@Module({
  imports: [HealthModule],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
})
export class ProductDetailModule {} 
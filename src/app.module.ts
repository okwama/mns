import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffAttendanceModule } from './modules/staff-attendance/staff-attendance.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { SalesRepAttendanceModule } from './modules/sales-rep-attendance/sales-rep-attendance.module';
import { SalesRepTargetPerformanceModule } from './modules/sales-rep-target-performance/sales-rep-target-performance.module';
import { ManagerPerformanceModule } from './modules/manager-performance/manager-performance.module';
import { ProductDetailModule } from './modules/product-detail/product-detail.module';
import { FinancialsModule } from './modules/financials/financials.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '102.130.125.52',
      port: Number(process.env.DB_PORT || 3306),
      username: process.env.DB_USERNAME || 'impulsep_root',
      password: process.env.DB_PASSWORD || 'bo9@bo9511221.qwerty',
      database: process.env.DB_DATABASE || 'impulsep_woosh',
      autoLoadEntities: true,
      synchronize: false,
      // Connection pool settings for better stability
      extra: {
        connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
        charset: 'utf8mb4',
        // MySQL2 specific options
        acquireTimeout: Number(process.env.DB_ACQUIRE_TIMEOUT || 60000),
        connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 60000),
      },
      // Retry configuration
      retryAttempts: Number(process.env.DB_RETRY_ATTEMPTS || 10),
      retryDelay: Number(process.env.DB_RETRY_DELAY || 3000),
      // Logging (only in development)
      logging: process.env.NODE_ENV === 'development',
    }),
    StaffAttendanceModule,
    InventoryModule,
    SalesRepAttendanceModule,
    SalesRepTargetPerformanceModule,
    ManagerPerformanceModule,
    ProductDetailModule,
    FinancialsModule,
    AuthModule,
    UserModule,
    HealthModule,
  ],
})
export class AppModule {}

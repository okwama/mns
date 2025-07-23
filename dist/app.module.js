"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const staff_attendance_module_1 = require("./modules/staff-attendance/staff-attendance.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const sales_rep_attendance_module_1 = require("./modules/sales-rep-attendance/sales-rep-attendance.module");
const sales_rep_target_performance_module_1 = require("./modules/sales-rep-target-performance/sales-rep-target-performance.module");
const manager_performance_module_1 = require("./modules/manager-performance/manager-performance.module");
const product_detail_module_1 = require("./modules/product-detail/product-detail.module");
const financials_module_1 = require("./modules/financials/financials.module");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const health_module_1 = require("./modules/health/health.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST || '102.130.125.52',
                port: Number(process.env.DB_PORT || 3306),
                username: process.env.DB_USERNAME || 'impulsep_root',
                password: process.env.DB_PASSWORD || 'bo9@bo9511221.qwerty',
                database: process.env.DB_DATABASE || 'impulsep_woosh',
                autoLoadEntities: true,
                synchronize: false,
                extra: {
                    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
                    charset: 'utf8mb4',
                    acquireTimeout: Number(process.env.DB_ACQUIRE_TIMEOUT || 60000),
                    connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 60000),
                },
                retryAttempts: Number(process.env.DB_RETRY_ATTEMPTS || 10),
                retryDelay: Number(process.env.DB_RETRY_DELAY || 3000),
                logging: process.env.NODE_ENV === 'development',
            }),
            staff_attendance_module_1.StaffAttendanceModule,
            inventory_module_1.InventoryModule,
            sales_rep_attendance_module_1.SalesRepAttendanceModule,
            sales_rep_target_performance_module_1.SalesRepTargetPerformanceModule,
            manager_performance_module_1.ManagerPerformanceModule,
            product_detail_module_1.ProductDetailModule,
            financials_module_1.FinancialsModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            health_module_1.HealthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
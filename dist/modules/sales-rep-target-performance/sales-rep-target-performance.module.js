"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRepTargetPerformanceModule = void 0;
const common_1 = require("@nestjs/common");
const sales_rep_target_performance_controller_1 = require("./sales-rep-target-performance.controller");
const sales_rep_target_performance_service_1 = require("./sales-rep-target-performance.service");
let SalesRepTargetPerformanceModule = class SalesRepTargetPerformanceModule {
};
exports.SalesRepTargetPerformanceModule = SalesRepTargetPerformanceModule;
exports.SalesRepTargetPerformanceModule = SalesRepTargetPerformanceModule = __decorate([
    (0, common_1.Module)({
        controllers: [sales_rep_target_performance_controller_1.SalesRepTargetPerformanceController],
        providers: [sales_rep_target_performance_service_1.SalesRepTargetPerformanceService],
    })
], SalesRepTargetPerformanceModule);
//# sourceMappingURL=sales-rep-target-performance.module.js.map
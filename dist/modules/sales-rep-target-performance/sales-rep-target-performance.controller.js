"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRepTargetPerformanceController = void 0;
const common_1 = require("@nestjs/common");
const sales_rep_target_performance_service_1 = require("./sales-rep-target-performance.service");
let SalesRepTargetPerformanceController = class SalesRepTargetPerformanceController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getPerformance(salesRepId, from, to) {
        return this.service.getPerformance(salesRepId, from, to);
    }
};
exports.SalesRepTargetPerformanceController = SalesRepTargetPerformanceController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('salesRepId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], SalesRepTargetPerformanceController.prototype, "getPerformance", null);
exports.SalesRepTargetPerformanceController = SalesRepTargetPerformanceController = __decorate([
    (0, common_1.Controller)('sales-rep-target-performance'),
    __metadata("design:paramtypes", [sales_rep_target_performance_service_1.SalesRepTargetPerformanceService])
], SalesRepTargetPerformanceController);
//# sourceMappingURL=sales-rep-target-performance.controller.js.map
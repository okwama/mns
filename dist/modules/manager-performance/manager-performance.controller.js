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
exports.ManagerPerformanceController = void 0;
const common_1 = require("@nestjs/common");
const manager_performance_service_1 = require("./manager-performance.service");
let ManagerPerformanceController = class ManagerPerformanceController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getPerformance(managerId, from, to) {
        return this.service.getPerformance(managerId, from, to);
    }
    async getOverview() {
        return this.service.getOverview();
    }
    async getManagerSalesReps(managerId) {
        return this.service.getManagerSalesReps(managerId);
    }
};
exports.ManagerPerformanceController = ManagerPerformanceController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('managerId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], ManagerPerformanceController.prototype, "getPerformance", null);
__decorate([
    (0, common_1.Get)('overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ManagerPerformanceController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)(':managerId/salesreps'),
    __param(0, (0, common_1.Param)('managerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ManagerPerformanceController.prototype, "getManagerSalesReps", null);
exports.ManagerPerformanceController = ManagerPerformanceController = __decorate([
    (0, common_1.Controller)('manager-performance'),
    __metadata("design:paramtypes", [manager_performance_service_1.ManagerPerformanceService])
], ManagerPerformanceController);
//# sourceMappingURL=manager-performance.controller.js.map
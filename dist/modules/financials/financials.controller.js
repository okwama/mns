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
exports.FinancialsController = void 0;
const common_1 = require("@nestjs/common");
const financials_service_1 = require("./financials.service");
let FinancialsController = class FinancialsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getMonthlyTrends(from, to) {
        return this.service.getMonthlyTrends(from, to);
    }
    async getTotalSales(from, to) {
        return this.service.getTotalSales(from, to);
    }
    async getBankBalances() {
        return this.service.getBankBalances();
    }
};
exports.FinancialsController = FinancialsController;
__decorate([
    (0, common_1.Get)('monthly-trends'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FinancialsController.prototype, "getMonthlyTrends", null);
__decorate([
    (0, common_1.Get)('total-sales'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FinancialsController.prototype, "getTotalSales", null);
__decorate([
    (0, common_1.Get)('bank-balances'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FinancialsController.prototype, "getBankBalances", null);
exports.FinancialsController = FinancialsController = __decorate([
    (0, common_1.Controller)('financials'),
    __metadata("design:paramtypes", [financials_service_1.FinancialsService])
], FinancialsController);
//# sourceMappingURL=financials.controller.js.map
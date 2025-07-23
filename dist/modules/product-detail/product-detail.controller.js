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
exports.ProductDetailController = void 0;
const common_1 = require("@nestjs/common");
const product_detail_service_1 = require("./product-detail.service");
let ProductDetailController = class ProductDetailController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getProductDetail(productId, from, to) {
        return this.service.getProductDetail(productId, from, to);
    }
    async getProductTimeSeries(productId, from, to) {
        return this.service.getProductTimeSeries(productId, from, to);
    }
    async getCategoryBreakdown(from, to) {
        return this.service.getCategoryBreakdown(from, to);
    }
    async getSalesRepBreakdown(from, to) {
        return this.service.getSalesRepBreakdown(from, to);
    }
    async getTopProducts(from, to, limit, by) {
        let parsedLimit = 10;
        if (limit) {
            const num = parseInt(limit, 10);
            if (!isNaN(num) && num > 0 && num <= 100) {
                parsedLimit = num;
            }
        }
        return this.service.getTopProducts(from, to, parsedLimit, by);
    }
    async getCountryRegionBreakdown(from, to) {
        return this.service.getCountryRegionBreakdown(from, to);
    }
    async getClientBreakdown(from, to) {
        return this.service.getClientBreakdown(from, to);
    }
    async getStoreBreakdown(from, to) {
        return this.service.getStoreBreakdown(from, to);
    }
    async getMonthlyBreakdown(from, to) {
        return this.service.getMonthlyBreakdown(from, to);
    }
    async getPerformanceVsTarget(from, to) {
        return this.service.getPerformanceVsTarget(from, to);
    }
};
exports.ProductDetailController = ProductDetailController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('productId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], ProductDetailController.prototype, "getProductDetail", null);
__decorate([
    (0, common_1.Get)('timeseries'),
    __param(0, (0, common_1.Query)('productId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], ProductDetailController.prototype, "getProductTimeSeries", null);
__decorate([
    (0, common_1.Get)('category-breakdown'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductDetailController.prototype, "getCategoryBreakdown", null);
__decorate([
    (0, common_1.Get)('salesrep-breakdown'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductDetailController.prototype, "getSalesRepBreakdown", null);
__decorate([
    (0, common_1.Get)('top'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('by')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProductDetailController.prototype, "getTopProducts", null);
__decorate([
    (0, common_1.Get)('country-region-breakdown'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductDetailController.prototype, "getCountryRegionBreakdown", null);
__decorate([
    (0, common_1.Get)('client-breakdown'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductDetailController.prototype, "getClientBreakdown", null);
__decorate([
    (0, common_1.Get)('store-breakdown'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductDetailController.prototype, "getStoreBreakdown", null);
__decorate([
    (0, common_1.Get)('monthly-breakdown'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductDetailController.prototype, "getMonthlyBreakdown", null);
__decorate([
    (0, common_1.Get)('performance-vs-target'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductDetailController.prototype, "getPerformanceVsTarget", null);
exports.ProductDetailController = ProductDetailController = __decorate([
    (0, common_1.Controller)('product-detail'),
    __metadata("design:paramtypes", [product_detail_service_1.ProductDetailService])
], ProductDetailController);
//# sourceMappingURL=product-detail.controller.js.map
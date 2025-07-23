"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDetailModule = void 0;
const common_1 = require("@nestjs/common");
const product_detail_controller_1 = require("./product-detail.controller");
const product_detail_service_1 = require("./product-detail.service");
const health_module_1 = require("../health/health.module");
let ProductDetailModule = class ProductDetailModule {
};
exports.ProductDetailModule = ProductDetailModule;
exports.ProductDetailModule = ProductDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [health_module_1.HealthModule],
        controllers: [product_detail_controller_1.ProductDetailController],
        providers: [product_detail_service_1.ProductDetailService],
    })
], ProductDetailModule);
//# sourceMappingURL=product-detail.module.js.map
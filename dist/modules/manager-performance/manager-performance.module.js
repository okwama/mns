"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerPerformanceModule = void 0;
const common_1 = require("@nestjs/common");
const manager_performance_controller_1 = require("./manager-performance.controller");
const manager_performance_service_1 = require("./manager-performance.service");
let ManagerPerformanceModule = class ManagerPerformanceModule {
};
exports.ManagerPerformanceModule = ManagerPerformanceModule;
exports.ManagerPerformanceModule = ManagerPerformanceModule = __decorate([
    (0, common_1.Module)({
        controllers: [manager_performance_controller_1.ManagerPerformanceController],
        providers: [manager_performance_service_1.ManagerPerformanceService],
    })
], ManagerPerformanceModule);
//# sourceMappingURL=manager-performance.module.js.map
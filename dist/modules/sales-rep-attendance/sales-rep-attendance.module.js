"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRepAttendanceModule = void 0;
const common_1 = require("@nestjs/common");
const sales_rep_attendance_controller_1 = require("./sales-rep-attendance.controller");
const sales_rep_attendance_service_1 = require("./sales-rep-attendance.service");
const health_module_1 = require("../health/health.module");
let SalesRepAttendanceModule = class SalesRepAttendanceModule {
};
exports.SalesRepAttendanceModule = SalesRepAttendanceModule;
exports.SalesRepAttendanceModule = SalesRepAttendanceModule = __decorate([
    (0, common_1.Module)({
        imports: [health_module_1.HealthModule],
        controllers: [sales_rep_attendance_controller_1.SalesRepAttendanceController],
        providers: [sales_rep_attendance_service_1.SalesRepAttendanceService],
    })
], SalesRepAttendanceModule);
//# sourceMappingURL=sales-rep-attendance.module.js.map
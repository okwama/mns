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
exports.SalesRepAttendanceController = void 0;
const common_1 = require("@nestjs/common");
const sales_rep_attendance_service_1 = require("./sales-rep-attendance.service");
let SalesRepAttendanceController = class SalesRepAttendanceController {
    salesRepAttendanceService;
    constructor(salesRepAttendanceService) {
        this.salesRepAttendanceService = salesRepAttendanceService;
    }
    async getAttendance(salesRepId, from, to) {
        return this.salesRepAttendanceService.getAttendance(salesRepId, from, to);
    }
    async getTodayAttendanceSummary() {
        return this.salesRepAttendanceService.getTodayAttendanceSummary();
    }
    async getAllSalesRepsWithAttendance() {
        return this.salesRepAttendanceService.getAllSalesRepsWithAttendance();
    }
    async getDailyAttendance(from, to) {
        return this.salesRepAttendanceService.getDailyAttendanceForDateRange(from, to);
    }
    async debugAttendanceData() {
        return this.salesRepAttendanceService.debugAttendanceData();
    }
    async getAttendanceById(id, from, to) {
        const salesRepId = parseInt(id);
        if (isNaN(salesRepId)) {
            throw new Error('Invalid sales rep ID');
        }
        return this.salesRepAttendanceService.getAttendance(salesRepId, from, to);
    }
};
exports.SalesRepAttendanceController = SalesRepAttendanceController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('salesRepId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], SalesRepAttendanceController.prototype, "getAttendance", null);
__decorate([
    (0, common_1.Get)('today-summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalesRepAttendanceController.prototype, "getTodayAttendanceSummary", null);
__decorate([
    (0, common_1.Get)('all-sales-reps'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalesRepAttendanceController.prototype, "getAllSalesRepsWithAttendance", null);
__decorate([
    (0, common_1.Get)('daily-attendance'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SalesRepAttendanceController.prototype, "getDailyAttendance", null);
__decorate([
    (0, common_1.Get)('debug'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalesRepAttendanceController.prototype, "debugAttendanceData", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SalesRepAttendanceController.prototype, "getAttendanceById", null);
exports.SalesRepAttendanceController = SalesRepAttendanceController = __decorate([
    (0, common_1.Controller)('sales-rep-attendance'),
    __metadata("design:paramtypes", [sales_rep_attendance_service_1.SalesRepAttendanceService])
], SalesRepAttendanceController);
//# sourceMappingURL=sales-rep-attendance.controller.js.map
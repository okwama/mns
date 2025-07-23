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
exports.StaffAttendanceController = void 0;
const common_1 = require("@nestjs/common");
const staff_attendance_service_1 = require("./staff-attendance.service");
let StaffAttendanceController = class StaffAttendanceController {
    staffAttendanceService;
    constructor(staffAttendanceService) {
        this.staffAttendanceService = staffAttendanceService;
    }
    async getStaffAttendance(staffId, from, to) {
        return this.staffAttendanceService.getStaffAttendance(staffId, from, to);
    }
    async getAllStaffAttendance(from, to) {
        return this.staffAttendanceService.getStaffAttendance(undefined, from, to);
    }
};
exports.StaffAttendanceController = StaffAttendanceController;
__decorate([
    (0, common_1.Get)(':staffId'),
    __param(0, (0, common_1.Param)('staffId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], StaffAttendanceController.prototype, "getStaffAttendance", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StaffAttendanceController.prototype, "getAllStaffAttendance", null);
exports.StaffAttendanceController = StaffAttendanceController = __decorate([
    (0, common_1.Controller)('staff-attendance'),
    __metadata("design:paramtypes", [staff_attendance_service_1.StaffAttendanceService])
], StaffAttendanceController);
//# sourceMappingURL=staff-attendance.controller.js.map
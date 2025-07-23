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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffAttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let StaffAttendanceService = class StaffAttendanceService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getStaffAttendance(staffId, from, to) {
        return this.dataSource.query('CALL get_staff_attendance(?, ?, ?)', [staffId ?? null, from ?? null, to ?? null]);
    }
};
exports.StaffAttendanceService = StaffAttendanceService;
exports.StaffAttendanceService = StaffAttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], StaffAttendanceService);
//# sourceMappingURL=staff-attendance.service.js.map
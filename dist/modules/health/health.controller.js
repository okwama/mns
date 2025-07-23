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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const database_health_service_1 = require("../../services/database-health.service");
let HealthController = class HealthController {
    databaseHealthService;
    constructor(databaseHealthService) {
        this.databaseHealthService = databaseHealthService;
    }
    async getHealth() {
        const dbStatus = this.databaseHealthService.getConnectionStatus();
        const isDbConnected = await this.databaseHealthService.checkConnection();
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            database: {
                connected: isDbConnected,
                reconnectAttempts: dbStatus.reconnectAttempts,
                isConnected: dbStatus.isConnected,
            },
            uptime: process.uptime(),
            memory: process.memoryUsage(),
        };
    }
    async getDatabaseHealth() {
        const isConnected = await this.databaseHealthService.checkConnection();
        const status = this.databaseHealthService.getConnectionStatus();
        return {
            connected: isConnected,
            reconnectAttempts: status.reconnectAttempts,
            isConnected: status.isConnected,
            timestamp: new Date().toISOString(),
        };
    }
    getVersion() {
        return {
            latest_version: '1.0.1',
            force_update: true
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)('database'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getDatabaseHealth", null);
__decorate([
    (0, common_1.Get)('version'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "getVersion", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [database_health_service_1.DatabaseHealthService])
], HealthController);
//# sourceMappingURL=health.controller.js.map
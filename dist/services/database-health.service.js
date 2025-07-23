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
var DatabaseHealthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseHealthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let DatabaseHealthService = DatabaseHealthService_1 = class DatabaseHealthService {
    dataSource;
    logger = new common_1.Logger(DatabaseHealthService_1.name);
    isConnected = false;
    reconnectAttempts = 0;
    maxReconnectAttempts = 5;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.initializeHealthCheck();
    }
    async initializeHealthCheck() {
        setInterval(async () => {
            await this.checkConnection();
        }, 30000);
        await this.checkConnection();
    }
    async checkConnection() {
        try {
            if (!this.dataSource.isInitialized) {
                this.logger.warn('Database not initialized, attempting to initialize...');
                await this.dataSource.initialize();
            }
            await this.dataSource.query('SELECT 1 as test');
            if (!this.isConnected) {
                this.logger.log('Database connection restored');
                this.isConnected = true;
                this.reconnectAttempts = 0;
            }
            return true;
        }
        catch (error) {
            this.isConnected = false;
            this.logger.error(`Database connection failed: ${error.message}`);
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
                this.reconnectAttempts++;
                this.logger.warn(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
                setTimeout(async () => {
                    try {
                        await this.dataSource.destroy();
                        await this.dataSource.initialize();
                        this.logger.log('Database reconnection successful');
                        this.isConnected = true;
                        this.reconnectAttempts = 0;
                    }
                    catch (reconnectError) {
                        this.logger.error(`Reconnection failed: ${reconnectError.message}`);
                    }
                }, 5000);
            }
            else {
                this.logger.error('Max reconnection attempts reached');
            }
            return false;
        }
    }
    async executeWithRetry(operation, maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const isConnected = await this.checkConnection();
                if (!isConnected) {
                    throw new Error('Database not connected');
                }
                return await operation();
            }
            catch (error) {
                this.logger.warn(`Operation failed (attempt ${attempt}/${maxRetries}): ${error.message}`);
                if (attempt === maxRetries) {
                    throw error;
                }
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            }
        }
        throw new Error('Max retry attempts reached');
    }
    getConnectionStatus() {
        return {
            isConnected: this.isConnected,
            reconnectAttempts: this.reconnectAttempts,
        };
    }
};
exports.DatabaseHealthService = DatabaseHealthService;
exports.DatabaseHealthService = DatabaseHealthService = DatabaseHealthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], DatabaseHealthService);
//# sourceMappingURL=database-health.service.js.map
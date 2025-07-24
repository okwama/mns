import { Controller, Get } from '@nestjs/common';
import { DatabaseHealthService } from '../../services/database-health.service';

@Controller('health')
export class HealthController {
  constructor(private databaseHealthService: DatabaseHealthService) {}

  @Get()
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

  @Get('database')
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

  @Get('version')
  getVersion() {
    return {
      latest_version: '1.0.2', // Update this as needed
      force_update: true
    };
  }
} 

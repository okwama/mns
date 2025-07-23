import { DatabaseHealthService } from '../../services/database-health.service';
export declare class HealthController {
    private databaseHealthService;
    constructor(databaseHealthService: DatabaseHealthService);
    getHealth(): Promise<{
        status: string;
        timestamp: string;
        database: {
            connected: boolean;
            reconnectAttempts: number;
            isConnected: boolean;
        };
        uptime: number;
        memory: NodeJS.MemoryUsage;
    }>;
    getDatabaseHealth(): Promise<{
        connected: boolean;
        reconnectAttempts: number;
        isConnected: boolean;
        timestamp: string;
    }>;
    getVersion(): {
        latest_version: string;
        force_update: boolean;
    };
}

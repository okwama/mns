import { DataSource } from 'typeorm';
export declare class DatabaseHealthService {
    private dataSource;
    private readonly logger;
    private isConnected;
    private reconnectAttempts;
    private maxReconnectAttempts;
    constructor(dataSource: DataSource);
    private initializeHealthCheck;
    checkConnection(): Promise<boolean>;
    executeWithRetry<T>(operation: () => Promise<T>, maxRetries?: number): Promise<T>;
    getConnectionStatus(): {
        isConnected: boolean;
        reconnectAttempts: number;
    };
}

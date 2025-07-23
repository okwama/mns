import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseHealthService {
  private readonly logger = new Logger(DatabaseHealthService.name);
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(private dataSource: DataSource) {
    this.initializeHealthCheck();
  }

  private async initializeHealthCheck() {
    // Check connection every 30 seconds
    setInterval(async () => {
      await this.checkConnection();
    }, 30000);

    // Initial connection check
    await this.checkConnection();
  }

  async checkConnection(): Promise<boolean> {
    try {
      if (!this.dataSource.isInitialized) {
        this.logger.warn('Database not initialized, attempting to initialize...');
        await this.dataSource.initialize();
      }

      // Test the connection with a simple query
      await this.dataSource.query('SELECT 1 as test');
      
      if (!this.isConnected) {
        this.logger.log('Database connection restored');
        this.isConnected = true;
        this.reconnectAttempts = 0;
      }
      
      return true;
    } catch (error) {
      this.isConnected = false;
      this.logger.error(`Database connection failed: ${error.message}`);
      
      // Attempt to reconnect
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
          } catch (reconnectError) {
            this.logger.error(`Reconnection failed: ${reconnectError.message}`);
          }
        }, 5000); // Wait 5 seconds before attempting reconnection
      } else {
        this.logger.error('Max reconnection attempts reached');
      }
      
      return false;
    }
  }

  async executeWithRetry<T>(operation: () => Promise<T>, maxRetries = 3): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Check connection before executing
        const isConnected = await this.checkConnection();
        if (!isConnected) {
          throw new Error('Database not connected');
        }
        
        return await operation();
      } catch (error) {
        this.logger.warn(`Operation failed (attempt ${attempt}/${maxRetries}): ${error.message}`);
        
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    
    throw new Error('Max retry attempts reached');
  }

  getConnectionStatus(): { isConnected: boolean; reconnectAttempts: number } {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
    };
  }
} 
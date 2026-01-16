import { sequelize } from '../models';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';
import { DB_CONFIG } from '../constants';

/**
 * Database Service - Handles database operations
 */
export class DatabaseService {
    /**
     * Initialize database connection
     */
    static async initialize(): Promise<void> {
        try {
            // Test database connection
            await sequelize.authenticate();
            console.log(SUCCESS_MESSAGES.DB_CONNECTED);

            // Sync models (creates tables if they don't exist)
            await sequelize.sync({
                alter: DB_CONFIG.SYNC_ALTER,
                force: DB_CONFIG.SYNC_FORCE
            });
            console.log(SUCCESS_MESSAGES.DB_SYNCED);
        } catch (error) {
            console.error(ERROR_MESSAGES.DB_CONNECTION_FAILED, error);
            throw error;
        }
    }

    /**
     * Close database connection
     */
    static async close(): Promise<void> {
        await sequelize.close();
    }
}

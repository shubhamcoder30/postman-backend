import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { DatabaseService } from './services/database.service';
import { SERVER_CONFIG } from './constants';
import { SUCCESS_MESSAGES } from './constants/messages';

// Load environment variables
dotenv.config();

const app: Application = express();
const port = process.env.PORT || SERVER_CONFIG.DEFAULT_PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api', routes);

/**
 * Start the server
 */
const startServer = async (): Promise<void> => {
    try {
        // Initialize database
        await DatabaseService.initialize();

        // Start listening
        app.listen(port, () => {
            console.log(`${SUCCESS_MESSAGES.SERVER_STARTED} ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await DatabaseService.close();
    process.exit(0);
});

// Start the server
startServer();

export default app;

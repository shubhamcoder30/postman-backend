import { Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import { HTTP_STATUS } from '../constants';

/**
 * Health Controller - Handles health check requests
 */
export class HealthController {
    /**
     * Health check endpoint
     * GET /api/health
     */
    static check = (req: Request, res: Response) => {
        return sendSuccess(
            res,
            { status: 'ok', timestamp: new Date().toISOString() },
            'Server is healthy',
            HTTP_STATUS.OK
        );
    };
}

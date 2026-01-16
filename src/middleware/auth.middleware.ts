import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { sendError } from '../utils/response';
import { HTTP_STATUS } from '../constants';
import { AUTH_MESSAGES } from '../constants/messages';

// Extend Express Request to include userId
declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

/**
 * Authentication middleware
 * Verifies JWT token and attaches userId to request
 */
export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return sendError(res, AUTH_MESSAGES.TOKEN_REQUIRED, HTTP_STATUS.UNAUTHORIZED);
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = AuthService.verifyToken(token);

        // Attach userId to request
        req.userId = decoded.userId;

        next();
    } catch (error: any) {
        return sendError(
            res,
            error.message || AUTH_MESSAGES.UNAUTHORIZED,
            HTTP_STATUS.UNAUTHORIZED
        );
    }
};

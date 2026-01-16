import { Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import { HTTP_STATUS } from '../constants';
import { AUTH_MESSAGES } from '../constants/messages';

/**
 * Auth Controller - Logout endpoint
 */
export class LogoutController {
    /**
     * User logout
     * POST /api/auth/logout
     */
    static logout = (req: Request, res: Response) => {
        // In a stateless JWT system, logout is handled client-side
        // by removing the token from localStorage
        // This endpoint can be used for logging/analytics

        return sendSuccess(
            res,
            null,
            AUTH_MESSAGES.LOGOUT_SUCCESS,
            HTTP_STATUS.OK
        );
    };
}

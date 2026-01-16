import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { sendSuccess, sendError, asyncHandler } from '../utils/response';
import { HTTP_STATUS } from '../constants';
import { AUTH_MESSAGES } from '../constants/messages';

/**
 * Auth Controller - Handles authentication requests
 */
export class AuthController {
    /**
     * User signup
     * POST /api/auth/signup
     */
    static signup = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const result = await AuthService.signup({ email, password });
            return sendSuccess(res, result, AUTH_MESSAGES.SIGNUP_SUCCESS, HTTP_STATUS.CREATED);
        } catch (error: any) {
            // Check for specific error types
            if (error.message === AUTH_MESSAGES.USER_EXISTS) {
                return sendError(res, error.message, HTTP_STATUS.BAD_REQUEST);
            }
            if (error.message === AUTH_MESSAGES.WEAK_PASSWORD) {
                return sendError(res, error.message, HTTP_STATUS.BAD_REQUEST);
            }

            return sendError(
                res,
                error.message || 'Signup failed',
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });

    /**
     * User login
     * POST /api/auth/login
     */
    static login = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const result = await AuthService.login({ email, password });
            return sendSuccess(res, result, AUTH_MESSAGES.LOGIN_SUCCESS);
        } catch (error: any) {
            // Check for specific error types
            if (error.message === AUTH_MESSAGES.INVALID_CREDENTIALS) {
                return sendError(res, error.message, HTTP_STATUS.UNAUTHORIZED);
            }

            return sendError(
                res,
                error.message || 'Login failed',
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });

    /**
     * Forgot password
     * POST /api/auth/forgot-password
     */
    static forgotPassword = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        try {
            const otp = await AuthService.forgotPassword(email);

            // In production, this token would be sent via email
            // For development, we return it in the response
            return sendSuccess(
                res,
                { otp },
                AUTH_MESSAGES.PASSWORD_RESET_SENT
            );
        } catch (error: any) {
            if (error.message === AUTH_MESSAGES.USER_NOT_FOUND) {
                return sendError(res, error.message, HTTP_STATUS.NOT_FOUND);
            }

            return sendError(
                res,
                error.message || 'Failed to process password reset',
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });

    /**
     * Reset password
     * POST /api/auth/reset-password
     */
    static resetPassword = asyncHandler(async (req: Request, res: Response) => {
        const { email, otp, newPassword } = req.body;

        try {
            await AuthService.resetPassword(email, otp, newPassword);
            return sendSuccess(res, null, AUTH_MESSAGES.PASSWORD_RESET_SUCCESS);
        } catch (error: any) {
            if (error.message === AUTH_MESSAGES.INVALID_TOKEN) {
                return sendError(res, error.message, HTTP_STATUS.BAD_REQUEST);
            }
            if (error.message === AUTH_MESSAGES.WEAK_PASSWORD) {
                return sendError(res, error.message, HTTP_STATUS.BAD_REQUEST);
            }

            return sendError(
                res,
                error.message || 'Failed to reset password',
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });
}

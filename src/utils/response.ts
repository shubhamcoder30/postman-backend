import { Response } from 'express';
import { HTTP_STATUS } from '../constants';

/**
 * Send success response
 */
export const sendSuccess = (
    res: Response,
    data: any,
    message?: string,
    statusCode: number = HTTP_STATUS.OK
) => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        data,
    });
};

/**
 * Send error response
 */
export const sendError = (
    res: Response,
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    error?: any
) => {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        error: error?.message || error,
    });
};

/**
 * Async handler wrapper to catch errors
 */
export const asyncHandler = (fn: Function) => {
    return (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

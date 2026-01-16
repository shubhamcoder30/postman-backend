import { Request, Response } from 'express';
import { ProxyService } from '../services/proxy.service';
import { sendSuccess, sendError, asyncHandler } from '../utils/response';
import { HTTP_STATUS } from '../constants';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';

/**
 * Proxy Controller - Handles proxy-related requests
 */
export class ProxyController {
    /**
     * Execute a proxied HTTP request
     * POST /api/proxy
     */
    static executeRequest = asyncHandler(async (req: Request, res: Response) => {
        const { url, method, headers, body } = req.body;

        try {
            const result = await ProxyService.executeRequest({
                url,
                method,
                headers,
                body,
            });

            return sendSuccess(res, result, SUCCESS_MESSAGES.REQUEST_SUCCESS);
        } catch (error: any) {
            return sendError(
                res,
                error.message || ERROR_MESSAGES.REQUEST_FAILED,
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                error
            );
        }
    });
}

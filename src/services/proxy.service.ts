import { ERROR_MESSAGES } from '../constants/messages';
import { isValidUrl, isValidHttpMethod, safeJsonParse } from '../utils/validation';

interface ProxyRequestData {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: any;
}

interface ProxyResponse {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    data: any;
    time: number;
    size: number;
}

/**
 * Proxy Service - Handles HTTP request proxying
 */
export class ProxyService {
    /**
     * Execute a proxied HTTP request
     */
    static async executeRequest(requestData: ProxyRequestData): Promise<ProxyResponse> {
        const { url, method, headers, body } = requestData;

        // Validate inputs
        if (!url) {
            throw new Error(ERROR_MESSAGES.MISSING_URL);
        }

        if (!method) {
            throw new Error(ERROR_MESSAGES.MISSING_METHOD);
        }

        if (!isValidUrl(url)) {
            throw new Error(ERROR_MESSAGES.INVALID_REQUEST);
        }

        if (!isValidHttpMethod(method)) {
            throw new Error(ERROR_MESSAGES.INVALID_REQUEST);
        }

        const startTime = Date.now();

        // Convert headers array [{key, value}] to Record<string, string> if needed
        let finalHeaders: Record<string, string> = {};
        if (Array.isArray(headers)) {
            headers.forEach((h: any) => {
                if (h && h.key && h.value) {
                    finalHeaders[h.key] = h.value;
                }
            });
        } else if (headers && typeof headers === 'object') {
            finalHeaders = headers as Record<string, string>;
        }

        // Prepare body - if it's already a string, don't double stringify
        let fetchBody: any = undefined;
        if (method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'HEAD' && body) {
            fetchBody = typeof body === 'string' ? body : JSON.stringify(body);

            // If it's a string that looks like JSON, we might want to ensure Content-Type is set
            if (!finalHeaders['Content-Type'] && !finalHeaders['content-type']) {
                if (typeof body === 'object' || (typeof body === 'string' && body.trim().startsWith('{'))) {
                    finalHeaders['Content-Type'] = 'application/json';
                }
            }
        }

        const response = await fetch(url, {
            method: method.toUpperCase(),
            headers: finalHeaders,
            body: fetchBody,
        });

        const endTime = Date.now();
        const responseData = await response.text();
        const parsedData = safeJsonParse(responseData);

        return {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            data: parsedData,
            time: endTime - startTime,
            size: responseData.length,
        };
    }
}

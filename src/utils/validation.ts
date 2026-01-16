/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Validate HTTP method
 */
export const isValidHttpMethod = (method: string): boolean => {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];
    return validMethods.includes(method.toUpperCase());
};

/**
 * Parse JSON safely
 */
export const safeJsonParse = (text: string): any => {
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
};

// Success Messages
export const SUCCESS_MESSAGES = {
    DB_CONNECTED: 'Database connection established successfully.',
    DB_SYNCED: 'Database synchronized.',
    SERVER_STARTED: 'Server running on port',
    REQUEST_SUCCESS: 'Request completed successfully.',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
    DB_CONNECTION_FAILED: 'Unable to connect to the database',
    REQUEST_FAILED: 'Failed to send request',
    INVALID_REQUEST: 'Invalid request parameters',
    INTERNAL_ERROR: 'Internal server error',
    MISSING_URL: 'URL is required',
    MISSING_METHOD: 'HTTP method is required',
} as const;

// Validation Messages
export const VALIDATION_MESSAGES = {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Invalid email format',
    INVALID_URL: 'Invalid URL format',
} as const;

// Authentication Messages
export const AUTH_MESSAGES = {
    SIGNUP_SUCCESS: 'User registered successfully',
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logout successful',
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_EXISTS: 'User already exists with this email',
    USER_NOT_FOUND: 'User not found',
    PASSWORD_RESET_SENT: 'Password reset link sent to your email',
    PASSWORD_RESET_SUCCESS: 'Password reset successful',
    INVALID_TOKEN: 'Invalid or expired token',
    UNAUTHORIZED: 'Unauthorized access',
    TOKEN_REQUIRED: 'Authentication token required',
    WEAK_PASSWORD: 'Password must be at least 6 characters long',
} as const;


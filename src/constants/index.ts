// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;

// Database Configuration
export const DB_CONFIG = {
    SYNC_ALTER: false,
    SYNC_FORCE: false,
} as const;

// Server Configuration
export const SERVER_CONFIG = {
    DEFAULT_PORT: 3000,
    CORS_ORIGIN: '*',
} as const;

// Request Methods
export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    OPTIONS: 'OPTIONS',
    HEAD: 'HEAD',
} as const;

// Body Types
export const BODY_TYPES = {
    NONE: 'none',
    JSON: 'json',
    FORM_DATA: 'form-data',
    RAW: 'raw',
    BINARY: 'binary',
    GRAPHQL: 'graphql',
} as const;

// Authentication
export const AUTH_CONSTANTS = {
    JWT_EXPIRES_IN: '7d',
    RESET_TOKEN_EXPIRES_IN: '1h',
    BCRYPT_SALT_ROUNDS: 10,
    MIN_PASSWORD_LENGTH: 6,
} as const;

// Token Types
export const TOKEN_TYPES = {
    ACCESS: 'access',
    REFRESH: 'refresh',
    RESET: 'reset',
} as const;


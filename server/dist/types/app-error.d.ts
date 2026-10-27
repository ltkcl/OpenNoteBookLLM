export declare class AppError extends Error {
    readonly statusCode: number;
    readonly details?: unknown;
    constructor(statusCode: number, message: string, details?: unknown);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string);
}
export declare class ValidationError extends AppError {
    constructor(message?: string, details?: unknown);
}
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
export declare class ConflictError extends AppError {
    constructor(message?: string);
}
//# sourceMappingURL=app-error.d.ts.map
// NotFoundError: Used when a resource is not found
export class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';
      this.statusCode = 404;
    }
  }
  
  // BadRequestError: Used for invalid requests (e.g., insufficient stock)
  export class BadRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = 'BadRequestError';
      this.statusCode = 400;
    }
  }
  
  // General error handler middleware (for Express)
  export function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      error: err.name,
      message: err.message
    });
  }
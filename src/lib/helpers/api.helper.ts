import { NextResponse } from 'next/server';

export interface ApiResponsePayload<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}

export class ApiResponse {
  static success<T = unknown>(message: string, data?: T, status = 200) {
    const payload: ApiResponsePayload<T> = {
      success: true,
      message,
    };
    if (data !== undefined) {
      payload.data = data;
    }
    return NextResponse.json(payload, { status });
  }

  static error(message: string, errors?: unknown, status = 400) {
    const payload: ApiResponsePayload = {
      success: false,
      message,
    };
    if (errors !== undefined) {
      payload.errors = errors;
    }
    return NextResponse.json(payload, { status });
  }

  static badRequest(message = 'Bad Request', errors?: unknown) {
    return this.error(message, errors, 400);
  }

  static unauthorized(message = 'Unauthorized', errors?: unknown) {
    return this.error(message, errors, 401);
  }

  static forbidden(message = 'Forbidden', errors?: unknown) {
    return this.error(message, errors, 403);
  }

  static notFound(message = 'Resource not found', errors?: unknown) {
    return this.error(message, errors, 404);
  }

  static internalServerError(message = 'Internal Server Error', errors?: unknown) {
    return this.error(message, errors, 500);
  }
}

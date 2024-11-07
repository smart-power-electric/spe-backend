import { Context } from 'src/common/core/context.entity';

export const ERRORTYPE = {
  INVALID_FORMAT: 'INVALID_FORMAT',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  CONFLICT: 'CONFLICT',
  NOT_AUTHORIZED: 'NOT_AUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
} as const;

export class ApplicationException extends Error {
  requestId: string | null;
  timestamp: string;
  type: string;
  details: (string | number | Date | boolean | null)[];
  constructor(
    message: string,
    type: string,
    requestId: string | null,
    timestamp: string,
    ...details: (string | number | Date | boolean | null)[]
  ) {
    super(message);
    this.name = 'ClientException';
    this.type = type;
    this.requestId = requestId;
    this.timestamp = timestamp;
    this.details = details;
  }
  toJSON() {
    return {
      message: this.message,
      requestId: this.requestId,
      timestamp: this.timestamp,
      details: this.details,
    };
  }
}

export class InvalidFormatException extends ApplicationException {
  constructor(
    ctx: Context | null,
    message: string,
    ...details: (string | number | Date | boolean | null)[]
  ) {
    super(
      message,
      ERRORTYPE.INVALID_FORMAT,
      ctx?.requestId ?? null,
      new Date().toISOString(),
      ...details,
    );
  }
}

export class NotFoundException extends ApplicationException {
  constructor(
    ctx: Context | null,
    message: string,
    ...details: (string | number | Date | boolean | null)[]
  ) {
    super(
      message,
      ERRORTYPE.NOT_FOUND,
      ctx?.requestId ?? null,
      new Date().toISOString(),
      ...details,
    );
  }
}

export class InternalErrorException extends ApplicationException {
  constructor(
    ctx: Context | null,
    message: string,
    ...details: (string | number | Date | boolean | null)[]
  ) {
    super(
      message,
      ERRORTYPE.INTERNAL_ERROR,
      ctx?.requestId ?? null,
      new Date().toISOString(),
      ...details,
    );
  }
}

export class ConflictException extends ApplicationException {
  constructor(
    ctx: Context | null,
    message: string,
    ...details: (string | number | Date | boolean | null)[]
  ) {
    super(
      message,
      ERRORTYPE.CONFLICT,
      ctx?.requestId ?? null,
      new Date().toISOString(),
      ...details,
    );
  }
}

export class NotAuthorizedException extends ApplicationException {
  constructor(
    ctx: Context | null,
    message: string,
    ...details: (string | number | Date | boolean | null)[]
  ) {
    super(
      message,
      ERRORTYPE.NOT_AUTHORIZED,
      ctx?.requestId ?? null,
      new Date().toISOString(),
      ...details,
    );
  }
}

export class ForbiddenException extends ApplicationException {
  constructor(
    ctx: Context | null,
    message: string,
    ...details: (string | number | Date | boolean | null)[]
  ) {
    super(
      message,
      ERRORTYPE.FORBIDDEN,
      ctx?.requestId ?? null,
      new Date().toISOString(),
      ...details,
    );
  }
}

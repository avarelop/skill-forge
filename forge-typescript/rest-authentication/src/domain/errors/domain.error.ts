import { ErrorCodes } from "../enums/errorCodes.enum";

export class DomainError extends Error {
  constructor(error: string, message: string) {
    super(message);
  }

  static badRequest(message: string) {
    return new DomainError(ErrorCodes.BAD_REQUEST, message);
  }

  static unauthorized(message: string) {
    return new DomainError(ErrorCodes.UNAUTHORIZED, message);
  }

  static forbidden(message: string) {
    return new DomainError(ErrorCodes.FORBIDDEN, message);
  }

  static notFound(message: string) {
    return new DomainError(ErrorCodes.NOT_FOUND, message);
  }

  static internalServerError(message: string) {
    return new DomainError(ErrorCodes.INTERNAL_SERVER_ERROR, message);
  }
}


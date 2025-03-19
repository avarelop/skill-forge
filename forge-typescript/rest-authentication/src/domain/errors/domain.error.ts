import { ResponseCodes } from "../enums/responseCodes.enum";

export class DomainError extends Error {
  constructor(error: string, message: string) {
    super(message);
  }

  static badRequest(message: string) {
    return new DomainError(ResponseCodes.BAD_REQUEST, message);
  }

  static unauthorized(message: string) {
    return new DomainError(ResponseCodes.UNAUTHORIZED, message);
  }

  static forbidden(message: string) {
    return new DomainError(ResponseCodes.FORBIDDEN, message);
  }

  static notFound(message: string) {
    return new DomainError(ResponseCodes.NOT_FOUND, message);
  }

  static internalServerError(message: string) {
    return new DomainError(ResponseCodes.INTERNAL_SERVER_ERROR, message);
  }
}


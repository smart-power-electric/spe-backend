import { ApiProperty } from '@nestjs/swagger';

/**
 *
 * This class represent the error format to return
 * @export
 * @class PlatformError
 * @extends {Error}
 *
 * @export
 * @class PlatformError
 * @extends {Error}
 */
export class PlatformError extends Error {
  /**
   * Creates an instance of PlatformError.
   * @param {number} code
   * @param {string} name
   * @param {string} message
   * @memberof PlatformError
   */
  constructor(
    readonly code: number,
    name: string,
    message: string,
  ) {
    super(message);
    this.name = name;
    Object.setPrototypeOf(this, PlatformError.prototype);
  }

  /**
   * This function is used to create a new instance of PlatformError with code 404
   *
   * @static
   * @param {string} message
   * @return {*}  {PlatformError}
   * @memberof PlatformError
   */
  static NotFound(message: string): PlatformError {
    return new PlatformError(404, 'NotFound', message);
  }

  /**
   * This function is used to create a new instance of PlatformError with code 400
   *
   * @static
   * @param {string} message
   * @return {*}  {PlatformError}
   * @memberof PlatformError
   */
  static BadRequest(message: string): PlatformError {
    return new PlatformError(400, 'BadRequest', message);
  }

  /**
   * This function is used to create a new instance of PlatformError with code 500
   *
   * @static
   * @param {string} message
   * @return {*}  {PlatformError}
   * @memberof PlatformError
   */
  static Internal(message: string): PlatformError {
    return new PlatformError(500, 'Internal', message);
  }

  /**
   * This function is used to create a new instance of PlatformError with code 401
   *
   * @static
   * @param {string} message
   * @return {*}  {PlatformError}
   * @memberof PlatformError
   */
  static Unauthorized(message: string): PlatformError {
    return new PlatformError(401, 'Unauthorized', message);
  }

  /**
   * This function is used to create a new instance of PlatformError with code 403
   *
   * @static
   * @param {string} message
   * @return {*}  {PlatformError}
   * @memberof PlatformError
   */
  static Forbidden(message: string): PlatformError {
    return new PlatformError(403, 'Forbidden', message);
  }

  /**
   * This function is used to create a new instance of PlatformError with code 409
   *
   * @static
   * @param {string} message
   * @return {*}  {PlatformError}
   * @memberof PlatformError
   */
  static Conflict(message: string): PlatformError {
    return new PlatformError(409, 'Conflict', message);
  }

  /**
   * This function is used to create a new instance of PlatformError with code 422
   *
   * @static
   * @param {string} message
   * @return {*}  {PlatformError}
   * @memberof PlatformError
   */
  static UnprocessableEntity(message: string): PlatformError {
    return new PlatformError(422, 'UnprocessableEntity', message);
  }

  /**
   * This function is used to create a new instance of PlatformError with code 501
   *
   * @static
   * @param {string} message
   * @return {*}  {PlatformError}
   * @memberof PlatformError
   */
  static NotImplemented(message: string): PlatformError {
    return new PlatformError(501, 'NotImplemented', message);
  }

  /**
   * This function is used to create a new instance of PlatformError with code 502
   *
   * @static
   * @param {string} message
   * @return {*}  {PlatformError}
   * @memberof PlatformError
   */
  static BadGateway(message: string): PlatformError {
    return new PlatformError(502, 'BadGateway', message);
  }

  /**
   * This function is used to create a new instance of PlatformError with code 503
   *
   * @static
   * @param {string} message
   * @return {*}  {PlatformError}
   * @memberof PlatformError
   */
  static ServiceUnavailable(message: string): PlatformError {
    return new PlatformError(503, 'ServiceUnavailable', message);
  }

  /**
   * This function is used to create a new instance of PlatformError with code 504
   *
   * @static
   * @param {string} message
   * @return {*}  {PlatformError}
   * @memberof PlatformError
   */
  static GatewayTimeout(message: string): PlatformError {
    return new PlatformError(504, 'GatewayTimeout', message);
  }
}

export class ErrorFormat {
  @ApiProperty()
  statusCode?: number;
  @ApiProperty()
  timestamp?: Date;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  path?: string;
  @ApiProperty()
  requestId?: string;
}

import { HttpException } from '@nestjs/common';
import { PlatformError } from './Error.entity';

/**
 * This function is used to parse PlatformErrors
 *
 * @param {PlatformError} err
 * @return {*}  {{
 *   code: number;
 *   message: string;
 *   name: string;
 * }}
 */
function parsePlatformError(err: PlatformError): {
  code: number;
  message: string;
  name: string;
} {
  const code = err.code ? err.code : 500;
  const message = err.message;
  const name = err.name;
  return { code, message, name };
}

/**
 * This function is used to parse errors
 *
 * @export
 * @param {unknown} err
 * @return {*}  {{
 *   code: number;
 *   message: string;
 *   name: string;
 * }}
 */
export function parseError(err: unknown): {
  code: number;
  message: string;
  name: string;
} {
  let errMessage: string;
  const code: number = 500;
  const errorName = 'Unknown Error';
  switch (typeof err) {
    case 'string':
      errMessage = err;
      break;
    case 'object':
      if (err instanceof PlatformError) {
        const platformError = err;
        return parsePlatformError(platformError);
      } else if (err instanceof HttpException) {
        const error = err;
        return new PlatformError(error.getStatus(), error.name, error.message);
      }
      errMessage = 'Something went wrong';
      break;
    default:
      errMessage = 'Unknown Error';
  }
  return { code, message: errMessage, name: errorName };
}

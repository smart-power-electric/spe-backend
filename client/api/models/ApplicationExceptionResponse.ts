/* tslint:disable */
/* eslint-disable */
/**
 * Smart Power Electric API
 * Smart Power Electric API Documentation
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ApplicationExceptionResponse
 */
export interface ApplicationExceptionResponse {
    /**
     * 
     * @type {number}
     * @memberof ApplicationExceptionResponse
     */
    statusCode: number;
    /**
     * 
     * @type {string}
     * @memberof ApplicationExceptionResponse
     */
    timestamp: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationExceptionResponse
     */
    message: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationExceptionResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationExceptionResponse
     */
    path: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationExceptionResponse
     */
    requestId: string;
}

/**
 * Check if a given object implements the ApplicationExceptionResponse interface.
 */
export function instanceOfApplicationExceptionResponse(value: object): value is ApplicationExceptionResponse {
    if (!('statusCode' in value) || value['statusCode'] === undefined) return false;
    if (!('timestamp' in value) || value['timestamp'] === undefined) return false;
    if (!('message' in value) || value['message'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('path' in value) || value['path'] === undefined) return false;
    if (!('requestId' in value) || value['requestId'] === undefined) return false;
    return true;
}

export function ApplicationExceptionResponseFromJSON(json: any): ApplicationExceptionResponse {
    return ApplicationExceptionResponseFromJSONTyped(json, false);
}

export function ApplicationExceptionResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApplicationExceptionResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'statusCode': json['statusCode'],
        'timestamp': json['timestamp'],
        'message': json['message'],
        'name': json['name'],
        'path': json['path'],
        'requestId': json['requestId'],
    };
}

  export function ApplicationExceptionResponseToJSON(json: any): ApplicationExceptionResponse {
      return ApplicationExceptionResponseToJSONTyped(json, false);
  }

  export function ApplicationExceptionResponseToJSONTyped(value?: ApplicationExceptionResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'statusCode': value['statusCode'],
        'timestamp': value['timestamp'],
        'message': value['message'],
        'name': value['name'],
        'path': value['path'],
        'requestId': value['requestId'],
    };
}


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
 * @interface UpdateWorkerRatesRequest
 */
export interface UpdateWorkerRatesRequest {
    /**
     * Rate of the workerRates
     * @type {number}
     * @memberof UpdateWorkerRatesRequest
     */
    rate?: number | null;
    /**
     * Effective date of the workerRates
     * @type {Date}
     * @memberof UpdateWorkerRatesRequest
     */
    effectiveDate?: Date | null;
}

/**
 * Check if a given object implements the UpdateWorkerRatesRequest interface.
 */
export function instanceOfUpdateWorkerRatesRequest(value: object): value is UpdateWorkerRatesRequest {
    return true;
}

export function UpdateWorkerRatesRequestFromJSON(json: any): UpdateWorkerRatesRequest {
    return UpdateWorkerRatesRequestFromJSONTyped(json, false);
}

export function UpdateWorkerRatesRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateWorkerRatesRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'rate': json['rate'] == null ? undefined : json['rate'],
        'effectiveDate': json['effectiveDate'] == null ? undefined : (new Date(json['effectiveDate'])),
    };
}

  export function UpdateWorkerRatesRequestToJSON(json: any): UpdateWorkerRatesRequest {
      return UpdateWorkerRatesRequestToJSONTyped(json, false);
  }

  export function UpdateWorkerRatesRequestToJSONTyped(value?: UpdateWorkerRatesRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'rate': value['rate'],
        'effectiveDate': value['effectiveDate'] == null ? undefined : ((value['effectiveDate'] as any).toISOString()),
    };
}


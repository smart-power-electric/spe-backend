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
import type { WorkerRatesResponse } from './WorkerRatesResponse';
import {
    WorkerRatesResponseFromJSON,
    WorkerRatesResponseFromJSONTyped,
    WorkerRatesResponseToJSON,
    WorkerRatesResponseToJSONTyped,
} from './WorkerRatesResponse';

/**
 * 
 * @export
 * @interface WorkerRatesPaginationResponse
 */
export interface WorkerRatesPaginationResponse {
    /**
     * Data of the workerRates
     * @type {Array<WorkerRatesResponse>}
     * @memberof WorkerRatesPaginationResponse
     */
    data: Array<WorkerRatesResponse>;
    /**
     * Total of the workerRates
     * @type {number}
     * @memberof WorkerRatesPaginationResponse
     */
    total: number;
}

/**
 * Check if a given object implements the WorkerRatesPaginationResponse interface.
 */
export function instanceOfWorkerRatesPaginationResponse(value: object): value is WorkerRatesPaginationResponse {
    if (!('data' in value) || value['data'] === undefined) return false;
    if (!('total' in value) || value['total'] === undefined) return false;
    return true;
}

export function WorkerRatesPaginationResponseFromJSON(json: any): WorkerRatesPaginationResponse {
    return WorkerRatesPaginationResponseFromJSONTyped(json, false);
}

export function WorkerRatesPaginationResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): WorkerRatesPaginationResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(WorkerRatesResponseFromJSON)),
        'total': json['total'],
    };
}

  export function WorkerRatesPaginationResponseToJSON(json: any): WorkerRatesPaginationResponse {
      return WorkerRatesPaginationResponseToJSONTyped(json, false);
  }

  export function WorkerRatesPaginationResponseToJSONTyped(value?: WorkerRatesPaginationResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': ((value['data'] as Array<any>).map(WorkerRatesResponseToJSON)),
        'total': value['total'],
    };
}

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
 * @interface CreateWorkerPaymentsRequest
 */
export interface CreateWorkerPaymentsRequest {
    /**
     * Name of the workerPayments
     * @type {string}
     * @memberof CreateWorkerPaymentsRequest
     */
    workerId: string | null;
    /**
     * Speciality of the workerPayments
     * @type {string}
     * @memberof CreateWorkerPaymentsRequest
     */
    serviceSheetId: string | null;
    /**
     * Contact of the workerPayments
     * @type {number}
     * @memberof CreateWorkerPaymentsRequest
     */
    totalPayment: number | null;
    /**
     * Email of the workerPayments
     * @type {Date}
     * @memberof CreateWorkerPaymentsRequest
     */
    paymentDate: Date | null;
    /**
     * Is extra of the workerPayments
     * @type {boolean}
     * @memberof CreateWorkerPaymentsRequest
     */
    isExtra: boolean | null;
}

/**
 * Check if a given object implements the CreateWorkerPaymentsRequest interface.
 */
export function instanceOfCreateWorkerPaymentsRequest(value: object): value is CreateWorkerPaymentsRequest {
    if (!('workerId' in value) || value['workerId'] === undefined) return false;
    if (!('serviceSheetId' in value) || value['serviceSheetId'] === undefined) return false;
    if (!('totalPayment' in value) || value['totalPayment'] === undefined) return false;
    if (!('paymentDate' in value) || value['paymentDate'] === undefined) return false;
    if (!('isExtra' in value) || value['isExtra'] === undefined) return false;
    return true;
}

export function CreateWorkerPaymentsRequestFromJSON(json: any): CreateWorkerPaymentsRequest {
    return CreateWorkerPaymentsRequestFromJSONTyped(json, false);
}

export function CreateWorkerPaymentsRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateWorkerPaymentsRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'workerId': json['workerId'],
        'serviceSheetId': json['serviceSheetId'],
        'totalPayment': json['totalPayment'],
        'paymentDate': (json['paymentDate'] == null ? null : new Date(json['paymentDate'])),
        'isExtra': json['isExtra'],
    };
}

  export function CreateWorkerPaymentsRequestToJSON(json: any): CreateWorkerPaymentsRequest {
      return CreateWorkerPaymentsRequestToJSONTyped(json, false);
  }

  export function CreateWorkerPaymentsRequestToJSONTyped(value?: CreateWorkerPaymentsRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'workerId': value['workerId'],
        'serviceSheetId': value['serviceSheetId'],
        'totalPayment': value['totalPayment'],
        'paymentDate': (value['paymentDate'] == null ? null : (value['paymentDate'] as any).toISOString()),
        'isExtra': value['isExtra'],
    };
}


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
 * @interface WorkerPaymentsResponse
 */
export interface WorkerPaymentsResponse {
    /**
     * Id of the workerPayments
     * @type {string}
     * @memberof WorkerPaymentsResponse
     */
    id: string;
    /**
     * Name of the workerPayments
     * @type {string}
     * @memberof WorkerPaymentsResponse
     */
    workerId: string | null;
    /**
     * Speciality of the workerPayments
     * @type {string}
     * @memberof WorkerPaymentsResponse
     */
    serviceSheetId: string | null;
    /**
     * Contact of the workerPayments
     * @type {string}
     * @memberof WorkerPaymentsResponse
     */
    totalPayment: string | null;
    /**
     * Email of the workerPayments
     * @type {string}
     * @memberof WorkerPaymentsResponse
     */
    paymentDate: string | null;
    /**
     * Is extra of the workerPayments
     * @type {string}
     * @memberof WorkerPaymentsResponse
     */
    isExtra: string | null;
    /**
     * Created at of the workerPayments
     * @type {string}
     * @memberof WorkerPaymentsResponse
     */
    createdAt: string | null;
    /**
     * Updated at of the workerPayments
     * @type {string}
     * @memberof WorkerPaymentsResponse
     */
    updatedAt: string | null;
}

/**
 * Check if a given object implements the WorkerPaymentsResponse interface.
 */
export function instanceOfWorkerPaymentsResponse(value: object): value is WorkerPaymentsResponse {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('workerId' in value) || value['workerId'] === undefined) return false;
    if (!('serviceSheetId' in value) || value['serviceSheetId'] === undefined) return false;
    if (!('totalPayment' in value) || value['totalPayment'] === undefined) return false;
    if (!('paymentDate' in value) || value['paymentDate'] === undefined) return false;
    if (!('isExtra' in value) || value['isExtra'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    return true;
}

export function WorkerPaymentsResponseFromJSON(json: any): WorkerPaymentsResponse {
    return WorkerPaymentsResponseFromJSONTyped(json, false);
}

export function WorkerPaymentsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): WorkerPaymentsResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'workerId': json['workerId'],
        'serviceSheetId': json['serviceSheetId'],
        'totalPayment': json['totalPayment'],
        'paymentDate': json['paymentDate'],
        'isExtra': json['isExtra'],
        'createdAt': json['createdAt'],
        'updatedAt': json['updatedAt'],
    };
}

  export function WorkerPaymentsResponseToJSON(json: any): WorkerPaymentsResponse {
      return WorkerPaymentsResponseToJSONTyped(json, false);
  }

  export function WorkerPaymentsResponseToJSONTyped(value?: WorkerPaymentsResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'workerId': value['workerId'],
        'serviceSheetId': value['serviceSheetId'],
        'totalPayment': value['totalPayment'],
        'paymentDate': value['paymentDate'],
        'isExtra': value['isExtra'],
        'createdAt': value['createdAt'],
        'updatedAt': value['updatedAt'],
    };
}

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
 * @interface CreateNotificationsRequest
 */
export interface CreateNotificationsRequest {
    /**
     * Id of the notifications
     * @type {string}
     * @memberof CreateNotificationsRequest
     */
    invoiceId: string | null;
    /**
     * Id of the notifications
     * @type {string}
     * @memberof CreateNotificationsRequest
     */
    clientId: string | null;
    /**
     * Id of the notifications
     * @type {string}
     * @memberof CreateNotificationsRequest
     */
    status: string | null;
}

/**
 * Check if a given object implements the CreateNotificationsRequest interface.
 */
export function instanceOfCreateNotificationsRequest(value: object): value is CreateNotificationsRequest {
    if (!('invoiceId' in value) || value['invoiceId'] === undefined) return false;
    if (!('clientId' in value) || value['clientId'] === undefined) return false;
    if (!('status' in value) || value['status'] === undefined) return false;
    return true;
}

export function CreateNotificationsRequestFromJSON(json: any): CreateNotificationsRequest {
    return CreateNotificationsRequestFromJSONTyped(json, false);
}

export function CreateNotificationsRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateNotificationsRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'invoiceId': json['invoiceId'],
        'clientId': json['clientId'],
        'status': json['status'],
    };
}

  export function CreateNotificationsRequestToJSON(json: any): CreateNotificationsRequest {
      return CreateNotificationsRequestToJSONTyped(json, false);
  }

  export function CreateNotificationsRequestToJSONTyped(value?: CreateNotificationsRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'invoiceId': value['invoiceId'],
        'clientId': value['clientId'],
        'status': value['status'],
    };
}


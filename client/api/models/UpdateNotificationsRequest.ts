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
 * @interface UpdateNotificationsRequest
 */
export interface UpdateNotificationsRequest {
    /**
     * Id of the notifications
     * @type {string}
     * @memberof UpdateNotificationsRequest
     */
    invoiceId?: string | null;
    /**
     * Id of the notifications
     * @type {string}
     * @memberof UpdateNotificationsRequest
     */
    clientId?: string | null;
    /**
     * Id of the notifications
     * @type {string}
     * @memberof UpdateNotificationsRequest
     */
    status?: string | null;
}

/**
 * Check if a given object implements the UpdateNotificationsRequest interface.
 */
export function instanceOfUpdateNotificationsRequest(value: object): value is UpdateNotificationsRequest {
    return true;
}

export function UpdateNotificationsRequestFromJSON(json: any): UpdateNotificationsRequest {
    return UpdateNotificationsRequestFromJSONTyped(json, false);
}

export function UpdateNotificationsRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateNotificationsRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'invoiceId': json['invoiceId'] == null ? undefined : json['invoiceId'],
        'clientId': json['clientId'] == null ? undefined : json['clientId'],
        'status': json['status'] == null ? undefined : json['status'],
    };
}

  export function UpdateNotificationsRequestToJSON(json: any): UpdateNotificationsRequest {
      return UpdateNotificationsRequestToJSONTyped(json, false);
  }

  export function UpdateNotificationsRequestToJSONTyped(value?: UpdateNotificationsRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'invoiceId': value['invoiceId'],
        'clientId': value['clientId'],
        'status': value['status'],
    };
}


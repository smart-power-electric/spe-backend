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
 * @interface UpdateUserRequest
 */
export interface UpdateUserRequest {
    /**
     * Full name of the user
     * @type {string}
     * @memberof UpdateUserRequest
     */
    fullname?: string;
    /**
     * Password of the user
     * @type {string}
     * @memberof UpdateUserRequest
     */
    password?: string;
    /**
     * Email of the user
     * @type {string}
     * @memberof UpdateUserRequest
     */
    email?: string;
    /**
     * Status of the user
     * @type {string}
     * @memberof UpdateUserRequest
     */
    status?: UpdateUserRequestStatusEnum | null;
    /**
     * Is the user enabled
     * @type {boolean}
     * @memberof UpdateUserRequest
     */
    isEnabled?: boolean | null;
}


/**
 * @export
 */
export const UpdateUserRequestStatusEnum = {
    Active: 'active',
    Inactive: 'inactive',
    Pending: 'pending',
    Blocked: 'blocked'
} as const;
export type UpdateUserRequestStatusEnum = typeof UpdateUserRequestStatusEnum[keyof typeof UpdateUserRequestStatusEnum];


/**
 * Check if a given object implements the UpdateUserRequest interface.
 */
export function instanceOfUpdateUserRequest(value: object): value is UpdateUserRequest {
    return true;
}

export function UpdateUserRequestFromJSON(json: any): UpdateUserRequest {
    return UpdateUserRequestFromJSONTyped(json, false);
}

export function UpdateUserRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateUserRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'fullname': json['fullname'] == null ? undefined : json['fullname'],
        'password': json['password'] == null ? undefined : json['password'],
        'email': json['email'] == null ? undefined : json['email'],
        'status': json['status'] == null ? undefined : json['status'],
        'isEnabled': json['isEnabled'] == null ? undefined : json['isEnabled'],
    };
}

  export function UpdateUserRequestToJSON(json: any): UpdateUserRequest {
      return UpdateUserRequestToJSONTyped(json, false);
  }

  export function UpdateUserRequestToJSONTyped(value?: UpdateUserRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'fullname': value['fullname'],
        'password': value['password'],
        'email': value['email'],
        'status': value['status'],
        'isEnabled': value['isEnabled'],
    };
}


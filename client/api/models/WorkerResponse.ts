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
 * @interface WorkerResponse
 */
export interface WorkerResponse {
    /**
     * Id of the worker
     * @type {string}
     * @memberof WorkerResponse
     */
    id: string;
    /**
     * Name of the worker
     * @type {string}
     * @memberof WorkerResponse
     */
    name: string | null;
    /**
     * Speciality of the worker
     * @type {string}
     * @memberof WorkerResponse
     */
    speciality: string | null;
    /**
     * Contact of the worker
     * @type {string}
     * @memberof WorkerResponse
     */
    contact: string | null;
    /**
     * Email of the worker
     * @type {string}
     * @memberof WorkerResponse
     */
    address: string | null;
    /**
     * Phone of the worker
     * @type {string}
     * @memberof WorkerResponse
     */
    phone: string | null;
    /**
     * City of the worker
     * @type {string}
     * @memberof WorkerResponse
     */
    socialSecurity: string | null;
    /**
     * State of the worker
     * @type {string}
     * @memberof WorkerResponse
     */
    startDate: string | null;
    /**
     * Zip of the worker
     * @type {string}
     * @memberof WorkerResponse
     */
    endDate: string | null;
    /**
     * Created at of the worker
     * @type {string}
     * @memberof WorkerResponse
     */
    createdAt: string | null;
    /**
     * Updated at of the worker
     * @type {string}
     * @memberof WorkerResponse
     */
    updatedAt: string | null;
}

/**
 * Check if a given object implements the WorkerResponse interface.
 */
export function instanceOfWorkerResponse(value: object): value is WorkerResponse {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('speciality' in value) || value['speciality'] === undefined) return false;
    if (!('contact' in value) || value['contact'] === undefined) return false;
    if (!('address' in value) || value['address'] === undefined) return false;
    if (!('phone' in value) || value['phone'] === undefined) return false;
    if (!('socialSecurity' in value) || value['socialSecurity'] === undefined) return false;
    if (!('startDate' in value) || value['startDate'] === undefined) return false;
    if (!('endDate' in value) || value['endDate'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    return true;
}

export function WorkerResponseFromJSON(json: any): WorkerResponse {
    return WorkerResponseFromJSONTyped(json, false);
}

export function WorkerResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): WorkerResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'speciality': json['speciality'],
        'contact': json['contact'],
        'address': json['address'],
        'phone': json['phone'],
        'socialSecurity': json['socialSecurity'],
        'startDate': json['startDate'],
        'endDate': json['endDate'],
        'createdAt': json['createdAt'],
        'updatedAt': json['updatedAt'],
    };
}

  export function WorkerResponseToJSON(json: any): WorkerResponse {
      return WorkerResponseToJSONTyped(json, false);
  }

  export function WorkerResponseToJSONTyped(value?: WorkerResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
        'speciality': value['speciality'],
        'contact': value['contact'],
        'address': value['address'],
        'phone': value['phone'],
        'socialSecurity': value['socialSecurity'],
        'startDate': value['startDate'],
        'endDate': value['endDate'],
        'createdAt': value['createdAt'],
        'updatedAt': value['updatedAt'],
    };
}

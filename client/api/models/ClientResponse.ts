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
 * @interface ClientResponse
 */
export interface ClientResponse {
    /**
     * Name of the client
     * @type {string}
     * @memberof ClientResponse
     */
    name: string | null;
    /**
     * Id of the client
     * @type {string}
     * @memberof ClientResponse
     */
    id: string | null;
    /**
     * Address of the client
     * @type {string}
     * @memberof ClientResponse
     */
    address: string | null;
    /**
     * Contact of the client
     * @type {string}
     * @memberof ClientResponse
     */
    contact: string | null;
    /**
     * Email of the client
     * @type {string}
     * @memberof ClientResponse
     */
    email: string | null;
    /**
     * Phone of the client
     * @type {string}
     * @memberof ClientResponse
     */
    phone: string | null;
    /**
     * City of the client
     * @type {string}
     * @memberof ClientResponse
     */
    city: string | null;
    /**
     * State of the client
     * @type {string}
     * @memberof ClientResponse
     */
    state: string | null;
    /**
     * Zip of the client
     * @type {string}
     * @memberof ClientResponse
     */
    zip: string | null;
    /**
     * Created at
     * @type {string}
     * @memberof ClientResponse
     */
    createdAt: string | null;
    /**
     * Updated at
     * @type {string}
     * @memberof ClientResponse
     */
    updatedAt: string | null;
}

/**
 * Check if a given object implements the ClientResponse interface.
 */
export function instanceOfClientResponse(value: object): value is ClientResponse {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('address' in value) || value['address'] === undefined) return false;
    if (!('contact' in value) || value['contact'] === undefined) return false;
    if (!('email' in value) || value['email'] === undefined) return false;
    if (!('phone' in value) || value['phone'] === undefined) return false;
    if (!('city' in value) || value['city'] === undefined) return false;
    if (!('state' in value) || value['state'] === undefined) return false;
    if (!('zip' in value) || value['zip'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    return true;
}

export function ClientResponseFromJSON(json: any): ClientResponse {
    return ClientResponseFromJSONTyped(json, false);
}

export function ClientResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ClientResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'id': json['id'],
        'address': json['address'],
        'contact': json['contact'],
        'email': json['email'],
        'phone': json['phone'],
        'city': json['city'],
        'state': json['state'],
        'zip': json['zip'],
        'createdAt': json['createdAt'],
        'updatedAt': json['updatedAt'],
    };
}

  export function ClientResponseToJSON(json: any): ClientResponse {
      return ClientResponseToJSONTyped(json, false);
  }

  export function ClientResponseToJSONTyped(value?: ClientResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'id': value['id'],
        'address': value['address'],
        'contact': value['contact'],
        'email': value['email'],
        'phone': value['phone'],
        'city': value['city'],
        'state': value['state'],
        'zip': value['zip'],
        'createdAt': value['createdAt'],
        'updatedAt': value['updatedAt'],
    };
}

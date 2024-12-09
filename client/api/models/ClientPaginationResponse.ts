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
import type { ClientResponse } from './ClientResponse';
import {
    ClientResponseFromJSON,
    ClientResponseFromJSONTyped,
    ClientResponseToJSON,
    ClientResponseToJSONTyped,
} from './ClientResponse';

/**
 * 
 * @export
 * @interface ClientPaginationResponse
 */
export interface ClientPaginationResponse {
    /**
     * List of clients
     * @type {Array<ClientResponse>}
     * @memberof ClientPaginationResponse
     */
    data: Array<ClientResponse> | null;
    /**
     * Total clients
     * @type {number}
     * @memberof ClientPaginationResponse
     */
    total: number | null;
}

/**
 * Check if a given object implements the ClientPaginationResponse interface.
 */
export function instanceOfClientPaginationResponse(value: object): value is ClientPaginationResponse {
    if (!('data' in value) || value['data'] === undefined) return false;
    if (!('total' in value) || value['total'] === undefined) return false;
    return true;
}

export function ClientPaginationResponseFromJSON(json: any): ClientPaginationResponse {
    return ClientPaginationResponseFromJSONTyped(json, false);
}

export function ClientPaginationResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ClientPaginationResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'data': (json['data'] == null ? null : (json['data'] as Array<any>).map(ClientResponseFromJSON)),
        'total': json['total'],
    };
}

  export function ClientPaginationResponseToJSON(json: any): ClientPaginationResponse {
      return ClientPaginationResponseToJSONTyped(json, false);
  }

  export function ClientPaginationResponseToJSONTyped(value?: ClientPaginationResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': (value['data'] == null ? null : (value['data'] as Array<any>).map(ClientResponseToJSON)),
        'total': value['total'],
    };
}


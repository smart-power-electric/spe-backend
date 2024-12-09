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
 * @interface MaterialResponse
 */
export interface MaterialResponse {
    /**
     * Id of the material
     * @type {string}
     * @memberof MaterialResponse
     */
    id: string;
    /**
     * Name of the material
     * @type {string}
     * @memberof MaterialResponse
     */
    name: string | null;
    /**
     * Unit cost of the material
     * @type {number}
     * @memberof MaterialResponse
     */
    unitCost: number | null;
    /**
     * Created at of the material
     * @type {string}
     * @memberof MaterialResponse
     */
    createdAt: string | null;
    /**
     * Updated at of the material
     * @type {string}
     * @memberof MaterialResponse
     */
    updatedAt: string | null;
}

/**
 * Check if a given object implements the MaterialResponse interface.
 */
export function instanceOfMaterialResponse(value: object): value is MaterialResponse {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('unitCost' in value) || value['unitCost'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    return true;
}

export function MaterialResponseFromJSON(json: any): MaterialResponse {
    return MaterialResponseFromJSONTyped(json, false);
}

export function MaterialResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): MaterialResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'unitCost': json['unitCost'],
        'createdAt': json['createdAt'],
        'updatedAt': json['updatedAt'],
    };
}

  export function MaterialResponseToJSON(json: any): MaterialResponse {
      return MaterialResponseToJSONTyped(json, false);
  }

  export function MaterialResponseToJSONTyped(value?: MaterialResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
        'unitCost': value['unitCost'],
        'createdAt': value['createdAt'],
        'updatedAt': value['updatedAt'],
    };
}


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
 * @interface CreateStageRequest
 */
export interface CreateStageRequest {
    /**
     * Name of the stage
     * @type {string}
     * @memberof CreateStageRequest
     */
    name: string | null;
    /**
     * Description of the stage
     * @type {string}
     * @memberof CreateStageRequest
     */
    description: string | null;
    /**
     * Project ID of the stage
     * @type {string}
     * @memberof CreateStageRequest
     */
    projectId: string | null;
    /**
     * Percentage of the stage
     * @type {number}
     * @memberof CreateStageRequest
     */
    percentage: number | null;
    /**
     * Adjusted percentage of the stage
     * @type {number}
     * @memberof CreateStageRequest
     */
    adjustedPercentage: number | null;
    /**
     * Start date of the stage
     * @type {Date}
     * @memberof CreateStageRequest
     */
    startDate: Date | null;
    /**
     * End date of the stage
     * @type {Date}
     * @memberof CreateStageRequest
     */
    endDate: Date | null;
}

/**
 * Check if a given object implements the CreateStageRequest interface.
 */
export function instanceOfCreateStageRequest(value: object): value is CreateStageRequest {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('projectId' in value) || value['projectId'] === undefined) return false;
    if (!('percentage' in value) || value['percentage'] === undefined) return false;
    if (!('adjustedPercentage' in value) || value['adjustedPercentage'] === undefined) return false;
    if (!('startDate' in value) || value['startDate'] === undefined) return false;
    if (!('endDate' in value) || value['endDate'] === undefined) return false;
    return true;
}

export function CreateStageRequestFromJSON(json: any): CreateStageRequest {
    return CreateStageRequestFromJSONTyped(json, false);
}

export function CreateStageRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateStageRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'description': json['description'],
        'projectId': json['projectId'],
        'percentage': json['percentage'],
        'adjustedPercentage': json['adjustedPercentage'],
        'startDate': (json['startDate'] == null ? null : new Date(json['startDate'])),
        'endDate': (json['endDate'] == null ? null : new Date(json['endDate'])),
    };
}

  export function CreateStageRequestToJSON(json: any): CreateStageRequest {
      return CreateStageRequestToJSONTyped(json, false);
  }

  export function CreateStageRequestToJSONTyped(value?: CreateStageRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'description': value['description'],
        'projectId': value['projectId'],
        'percentage': value['percentage'],
        'adjustedPercentage': value['adjustedPercentage'],
        'startDate': (value['startDate'] == null ? null : (value['startDate'] as any).toISOString()),
        'endDate': (value['endDate'] == null ? null : (value['endDate'] as any).toISOString()),
    };
}

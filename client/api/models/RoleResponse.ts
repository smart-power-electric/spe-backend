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
 * @interface RoleResponse
 */
export interface RoleResponse {
    /**
     * Role identifier
     * @type {string}
     * @memberof RoleResponse
     */
    id: string;
    /**
     * Role name
     * @type {string}
     * @memberof RoleResponse
     */
    roleName: string;
    /**
     * Role description
     * @type {string}
     * @memberof RoleResponse
     */
    roleDescription: string;
    /**
     * Role
     * @type {string}
     * @memberof RoleResponse
     */
    role: string;
    /**
     * Creation date
     * @type {string}
     * @memberof RoleResponse
     */
    createdAt: string;
    /**
     * Update date
     * @type {string}
     * @memberof RoleResponse
     */
    updatedAt: string | null;
    /**
     * Deletion date
     * @type {string}
     * @memberof RoleResponse
     */
    deletedAt: string | null;
}

/**
 * Check if a given object implements the RoleResponse interface.
 */
export function instanceOfRoleResponse(value: object): value is RoleResponse {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('roleName' in value) || value['roleName'] === undefined) return false;
    if (!('roleDescription' in value) || value['roleDescription'] === undefined) return false;
    if (!('role' in value) || value['role'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    if (!('deletedAt' in value) || value['deletedAt'] === undefined) return false;
    return true;
}

export function RoleResponseFromJSON(json: any): RoleResponse {
    return RoleResponseFromJSONTyped(json, false);
}

export function RoleResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoleResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'roleName': json['roleName'],
        'roleDescription': json['roleDescription'],
        'role': json['role'],
        'createdAt': json['createdAt'],
        'updatedAt': json['updatedAt'],
        'deletedAt': json['deletedAt'],
    };
}

  export function RoleResponseToJSON(json: any): RoleResponse {
      return RoleResponseToJSONTyped(json, false);
  }

  export function RoleResponseToJSONTyped(value?: RoleResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'roleName': value['roleName'],
        'roleDescription': value['roleDescription'],
        'role': value['role'],
        'createdAt': value['createdAt'],
        'updatedAt': value['updatedAt'],
        'deletedAt': value['deletedAt'],
    };
}


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


import * as runtime from '../runtime';
import type {
  ApplicationExceptionResponse,
  CreateUserRequest,
  RoleResponse,
  UpdateUserRequest,
  UserPaginationResponse,
  UserResponse,
} from '../models/index';
import {
    ApplicationExceptionResponseFromJSON,
    ApplicationExceptionResponseToJSON,
    CreateUserRequestFromJSON,
    CreateUserRequestToJSON,
    RoleResponseFromJSON,
    RoleResponseToJSON,
    UpdateUserRequestFromJSON,
    UpdateUserRequestToJSON,
    UserPaginationResponseFromJSON,
    UserPaginationResponseToJSON,
    UserResponseFromJSON,
    UserResponseToJSON,
} from '../models/index';

export interface CreateUserOperationRequest {
    createUserRequest: CreateUserRequest;
}

export interface FindAllUserRequest {
    limit?: number;
    offset?: number;
    search?: string;
}

export interface FindOneUserRequest {
    id: string;
}

export interface FindUserRolesRequest {
    id: string;
}

export interface RemoveUserRequest {
    id: string;
}

export interface UpdateUserOperationRequest {
    id: string;
    updateUserRequest: UpdateUserRequest;
}

/**
 * 
 */
export class UserApi extends runtime.BaseAPI {

    /**
     * Create a new user
     */
    async createUserRaw(requestParameters: CreateUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserResponse>> {
        if (requestParameters['createUserRequest'] == null) {
            throw new runtime.RequiredError(
                'createUserRequest',
                'Required parameter "createUserRequest" was null or undefined when calling createUser().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateUserRequestToJSON(requestParameters['createUserRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserResponseFromJSON(jsonValue));
    }

    /**
     * Create a new user
     */
    async createUser(requestParameters: CreateUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserResponse> {
        const response = await this.createUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all users
     */
    async findAllUserRaw(requestParameters: FindAllUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserPaginationResponse>> {
        const queryParameters: any = {};

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        if (requestParameters['search'] != null) {
            queryParameters['search'] = requestParameters['search'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserPaginationResponseFromJSON(jsonValue));
    }

    /**
     * Get all users
     */
    async findAllUser(requestParameters: FindAllUserRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserPaginationResponse> {
        const response = await this.findAllUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get user by id
     */
    async findOneUserRaw(requestParameters: FindOneUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling findOneUser().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserResponseFromJSON(jsonValue));
    }

    /**
     * Get user by id
     */
    async findOneUser(requestParameters: FindOneUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserResponse> {
        const response = await this.findOneUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get user roles
     */
    async findUserRolesRaw(requestParameters: FindUserRolesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<RoleResponse>>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling findUserRoles().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/users/{id}/roles`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(RoleResponseFromJSON));
    }

    /**
     * Get user roles
     */
    async findUserRoles(requestParameters: FindUserRolesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<RoleResponse>> {
        const response = await this.findUserRolesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async removeUserRaw(requestParameters: RemoveUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling removeUser().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async removeUser(requestParameters: RemoveUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.removeUserRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateUserRaw(requestParameters: UpdateUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling updateUser().'
            );
        }

        if (requestParameters['updateUserRequest'] == null) {
            throw new runtime.RequiredError(
                'updateUserRequest',
                'Required parameter "updateUserRequest" was null or undefined when calling updateUser().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateUserRequestToJSON(requestParameters['updateUserRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserResponseFromJSON(jsonValue));
    }

    /**
     */
    async updateUser(requestParameters: UpdateUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserResponse> {
        const response = await this.updateUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
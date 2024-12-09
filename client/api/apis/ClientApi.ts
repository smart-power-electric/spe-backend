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
  ClientPaginationResponse,
  ClientResponse,
  CreateClientRequest,
  UpdateClientRequest,
} from '../models/index';
import {
    ApplicationExceptionResponseFromJSON,
    ApplicationExceptionResponseToJSON,
    ClientPaginationResponseFromJSON,
    ClientPaginationResponseToJSON,
    ClientResponseFromJSON,
    ClientResponseToJSON,
    CreateClientRequestFromJSON,
    CreateClientRequestToJSON,
    UpdateClientRequestFromJSON,
    UpdateClientRequestToJSON,
} from '../models/index';

export interface CreateClientOperationRequest {
    createClientRequest: CreateClientRequest;
}

export interface FindAllClientRequest {
    limit?: number;
    offset?: number;
    name?: string;
    email?: string;
    sortOrder?: FindAllClientSortOrderEnum;
    sortField?: FindAllClientSortFieldEnum;
}

export interface FindOneClientRequest {
    id: string;
}

export interface RemoveClientRequest {
    id: string;
}

export interface UpdateClientOperationRequest {
    id: string;
    updateClientRequest: UpdateClientRequest;
}

/**
 * 
 */
export class ClientApi extends runtime.BaseAPI {

    /**
     * Create a new client
     */
    async createClientRaw(requestParameters: CreateClientOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ClientResponse>> {
        if (requestParameters['createClientRequest'] == null) {
            throw new runtime.RequiredError(
                'createClientRequest',
                'Required parameter "createClientRequest" was null or undefined when calling createClient().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/client`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateClientRequestToJSON(requestParameters['createClientRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ClientResponseFromJSON(jsonValue));
    }

    /**
     * Create a new client
     */
    async createClient(requestParameters: CreateClientOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ClientResponse> {
        const response = await this.createClientRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all clients
     */
    async findAllClientRaw(requestParameters: FindAllClientRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ClientPaginationResponse>> {
        const queryParameters: any = {};

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        if (requestParameters['name'] != null) {
            queryParameters['name'] = requestParameters['name'];
        }

        if (requestParameters['email'] != null) {
            queryParameters['email'] = requestParameters['email'];
        }

        if (requestParameters['sortOrder'] != null) {
            queryParameters['sortOrder'] = requestParameters['sortOrder'];
        }

        if (requestParameters['sortField'] != null) {
            queryParameters['sortField'] = requestParameters['sortField'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/client`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ClientPaginationResponseFromJSON(jsonValue));
    }

    /**
     * Get all clients
     */
    async findAllClient(requestParameters: FindAllClientRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ClientPaginationResponse> {
        const response = await this.findAllClientRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get client by id
     */
    async findOneClientRaw(requestParameters: FindOneClientRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ClientResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling findOneClient().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/client/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ClientResponseFromJSON(jsonValue));
    }

    /**
     * Get client by id
     */
    async findOneClient(requestParameters: FindOneClientRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ClientResponse> {
        const response = await this.findOneClientRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async removeClientRaw(requestParameters: RemoveClientRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling removeClient().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/client/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async removeClient(requestParameters: RemoveClientRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.removeClientRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateClientRaw(requestParameters: UpdateClientOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ClientResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling updateClient().'
            );
        }

        if (requestParameters['updateClientRequest'] == null) {
            throw new runtime.RequiredError(
                'updateClientRequest',
                'Required parameter "updateClientRequest" was null or undefined when calling updateClient().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/client/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateClientRequestToJSON(requestParameters['updateClientRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ClientResponseFromJSON(jsonValue));
    }

    /**
     */
    async updateClient(requestParameters: UpdateClientOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ClientResponse> {
        const response = await this.updateClientRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const FindAllClientSortOrderEnum = {
    Asc: 'ASC',
    Desc: 'DESC'
} as const;
export type FindAllClientSortOrderEnum = typeof FindAllClientSortOrderEnum[keyof typeof FindAllClientSortOrderEnum];
/**
 * @export
 */
export const FindAllClientSortFieldEnum = {
    Id: 'id',
    Name: 'name',
    Address: 'address',
    Tin: 'tin',
    Contact: 'contact',
    Email: 'email',
    Phone: 'phone',
    City: 'city',
    State: 'state',
    Zip: 'zip',
    CreatedAt: 'createdAt',
    UpdatedAt: 'updatedAt'
} as const;
export type FindAllClientSortFieldEnum = typeof FindAllClientSortFieldEnum[keyof typeof FindAllClientSortFieldEnum];

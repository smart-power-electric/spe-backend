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
  CreateWorkerRatesRequest,
  UpdateWorkerRatesRequest,
  WorkerRatesResponse,
} from '../models/index';
import {
    ApplicationExceptionResponseFromJSON,
    ApplicationExceptionResponseToJSON,
    CreateWorkerRatesRequestFromJSON,
    CreateWorkerRatesRequestToJSON,
    UpdateWorkerRatesRequestFromJSON,
    UpdateWorkerRatesRequestToJSON,
    WorkerRatesResponseFromJSON,
    WorkerRatesResponseToJSON,
} from '../models/index';

export interface CreateWorkerRatesOperationRequest {
    createWorkerRatesRequest: CreateWorkerRatesRequest;
}

export interface FindAllWorkerRatesRequest {
    limit?: number;
    offset?: number;
    workerId?: string;
}

export interface FindOneWorkerRatesRequest {
    id: number;
}

export interface RemoveWorkerRatesRequest {
    id: number;
}

export interface UpdateWorkerRatesOperationRequest {
    id: number;
    updateWorkerRatesRequest: UpdateWorkerRatesRequest;
}

/**
 * 
 */
export class WorkerRatesApi extends runtime.BaseAPI {

    /**
     * Create a new workerRates
     */
    async createWorkerRatesRaw(requestParameters: CreateWorkerRatesOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WorkerRatesResponse>> {
        if (requestParameters['createWorkerRatesRequest'] == null) {
            throw new runtime.RequiredError(
                'createWorkerRatesRequest',
                'Required parameter "createWorkerRatesRequest" was null or undefined when calling createWorkerRates().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/workerRates`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateWorkerRatesRequestToJSON(requestParameters['createWorkerRatesRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkerRatesResponseFromJSON(jsonValue));
    }

    /**
     * Create a new workerRates
     */
    async createWorkerRates(requestParameters: CreateWorkerRatesOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WorkerRatesResponse> {
        const response = await this.createWorkerRatesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all workerRatess
     */
    async findAllWorkerRatesRaw(requestParameters: FindAllWorkerRatesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<WorkerRatesResponse>>> {
        const queryParameters: any = {};

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        if (requestParameters['workerId'] != null) {
            queryParameters['workerId'] = requestParameters['workerId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/workerRates`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(WorkerRatesResponseFromJSON));
    }

    /**
     * Get all workerRatess
     */
    async findAllWorkerRates(requestParameters: FindAllWorkerRatesRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<WorkerRatesResponse>> {
        const response = await this.findAllWorkerRatesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get workerRates by id
     */
    async findOneWorkerRatesRaw(requestParameters: FindOneWorkerRatesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WorkerRatesResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling findOneWorkerRates().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/workerRates/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkerRatesResponseFromJSON(jsonValue));
    }

    /**
     * Get workerRates by id
     */
    async findOneWorkerRates(requestParameters: FindOneWorkerRatesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WorkerRatesResponse> {
        const response = await this.findOneWorkerRatesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async removeWorkerRatesRaw(requestParameters: RemoveWorkerRatesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling removeWorkerRates().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/workerRates/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async removeWorkerRates(requestParameters: RemoveWorkerRatesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.removeWorkerRatesRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateWorkerRatesRaw(requestParameters: UpdateWorkerRatesOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WorkerRatesResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling updateWorkerRates().'
            );
        }

        if (requestParameters['updateWorkerRatesRequest'] == null) {
            throw new runtime.RequiredError(
                'updateWorkerRatesRequest',
                'Required parameter "updateWorkerRatesRequest" was null or undefined when calling updateWorkerRates().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/workerRates/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateWorkerRatesRequestToJSON(requestParameters['updateWorkerRatesRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkerRatesResponseFromJSON(jsonValue));
    }

    /**
     */
    async updateWorkerRates(requestParameters: UpdateWorkerRatesOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WorkerRatesResponse> {
        const response = await this.updateWorkerRatesRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
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
  CreateWorkerAssignmentRequest,
  UpdateWorkerAssignmentRequest,
  WorkerAssignmentResponse,
} from '../models/index';
import {
    ApplicationExceptionResponseFromJSON,
    ApplicationExceptionResponseToJSON,
    CreateWorkerAssignmentRequestFromJSON,
    CreateWorkerAssignmentRequestToJSON,
    UpdateWorkerAssignmentRequestFromJSON,
    UpdateWorkerAssignmentRequestToJSON,
    WorkerAssignmentResponseFromJSON,
    WorkerAssignmentResponseToJSON,
} from '../models/index';

export interface CreateWorkerAssignmentOperationRequest {
    createWorkerAssignmentRequest: CreateWorkerAssignmentRequest;
}

export interface FindAllWorkerAssignmentRequest {
    limit?: number;
    offset?: number;
    workerId?: string;
    projectId?: string;
    stageId?: string;
}

export interface FindOneWorkerAssignmentRequest {
    id: number;
}

export interface RemoveWorkerAssignmentRequest {
    id: number;
}

export interface UpdateWorkerAssignmentOperationRequest {
    id: number;
    updateWorkerAssignmentRequest: UpdateWorkerAssignmentRequest;
}

/**
 * 
 */
export class WorkerAssignmentApi extends runtime.BaseAPI {

    /**
     * Create a new workerAssignment
     */
    async createWorkerAssignmentRaw(requestParameters: CreateWorkerAssignmentOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WorkerAssignmentResponse>> {
        if (requestParameters['createWorkerAssignmentRequest'] == null) {
            throw new runtime.RequiredError(
                'createWorkerAssignmentRequest',
                'Required parameter "createWorkerAssignmentRequest" was null or undefined when calling createWorkerAssignment().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/workerAssignment`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateWorkerAssignmentRequestToJSON(requestParameters['createWorkerAssignmentRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkerAssignmentResponseFromJSON(jsonValue));
    }

    /**
     * Create a new workerAssignment
     */
    async createWorkerAssignment(requestParameters: CreateWorkerAssignmentOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WorkerAssignmentResponse> {
        const response = await this.createWorkerAssignmentRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all workerAssignments
     */
    async findAllWorkerAssignmentRaw(requestParameters: FindAllWorkerAssignmentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<WorkerAssignmentResponse>>> {
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

        if (requestParameters['projectId'] != null) {
            queryParameters['projectId'] = requestParameters['projectId'];
        }

        if (requestParameters['stageId'] != null) {
            queryParameters['stageId'] = requestParameters['stageId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/workerAssignment`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(WorkerAssignmentResponseFromJSON));
    }

    /**
     * Get all workerAssignments
     */
    async findAllWorkerAssignment(requestParameters: FindAllWorkerAssignmentRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<WorkerAssignmentResponse>> {
        const response = await this.findAllWorkerAssignmentRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get workerAssignment by id
     */
    async findOneWorkerAssignmentRaw(requestParameters: FindOneWorkerAssignmentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WorkerAssignmentResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling findOneWorkerAssignment().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/workerAssignment/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkerAssignmentResponseFromJSON(jsonValue));
    }

    /**
     * Get workerAssignment by id
     */
    async findOneWorkerAssignment(requestParameters: FindOneWorkerAssignmentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WorkerAssignmentResponse> {
        const response = await this.findOneWorkerAssignmentRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async removeWorkerAssignmentRaw(requestParameters: RemoveWorkerAssignmentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling removeWorkerAssignment().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/workerAssignment/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async removeWorkerAssignment(requestParameters: RemoveWorkerAssignmentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.removeWorkerAssignmentRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateWorkerAssignmentRaw(requestParameters: UpdateWorkerAssignmentOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WorkerAssignmentResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling updateWorkerAssignment().'
            );
        }

        if (requestParameters['updateWorkerAssignmentRequest'] == null) {
            throw new runtime.RequiredError(
                'updateWorkerAssignmentRequest',
                'Required parameter "updateWorkerAssignmentRequest" was null or undefined when calling updateWorkerAssignment().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/workerAssignment/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateWorkerAssignmentRequestToJSON(requestParameters['updateWorkerAssignmentRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkerAssignmentResponseFromJSON(jsonValue));
    }

    /**
     */
    async updateWorkerAssignment(requestParameters: UpdateWorkerAssignmentOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WorkerAssignmentResponse> {
        const response = await this.updateWorkerAssignmentRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
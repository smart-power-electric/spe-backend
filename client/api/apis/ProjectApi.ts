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
  CreateProjectRequest,
  ProjectResponse,
  UpdateProjectRequest,
} from '../models/index';
import {
    ApplicationExceptionResponseFromJSON,
    ApplicationExceptionResponseToJSON,
    CreateProjectRequestFromJSON,
    CreateProjectRequestToJSON,
    ProjectResponseFromJSON,
    ProjectResponseToJSON,
    UpdateProjectRequestFromJSON,
    UpdateProjectRequestToJSON,
} from '../models/index';

export interface CreateProjectOperationRequest {
    createProjectRequest: CreateProjectRequest;
}

export interface FindAllProjectRequest {
    limit?: number;
    offset?: number;
    clientId?: string;
}

export interface FindOneProjectRequest {
    id: number;
}

export interface RemoveProjectRequest {
    id: number;
}

export interface UpdateProjectOperationRequest {
    id: number;
    updateProjectRequest: UpdateProjectRequest;
}

/**
 * 
 */
export class ProjectApi extends runtime.BaseAPI {

    /**
     * Create a new project
     */
    async createProjectRaw(requestParameters: CreateProjectOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProjectResponse>> {
        if (requestParameters['createProjectRequest'] == null) {
            throw new runtime.RequiredError(
                'createProjectRequest',
                'Required parameter "createProjectRequest" was null or undefined when calling createProject().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/project`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateProjectRequestToJSON(requestParameters['createProjectRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectResponseFromJSON(jsonValue));
    }

    /**
     * Create a new project
     */
    async createProject(requestParameters: CreateProjectOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProjectResponse> {
        const response = await this.createProjectRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all projects
     */
    async findAllProjectRaw(requestParameters: FindAllProjectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ProjectResponse>>> {
        const queryParameters: any = {};

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        if (requestParameters['clientId'] != null) {
            queryParameters['clientId'] = requestParameters['clientId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/project`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ProjectResponseFromJSON));
    }

    /**
     * Get all projects
     */
    async findAllProject(requestParameters: FindAllProjectRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ProjectResponse>> {
        const response = await this.findAllProjectRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get project by id
     */
    async findOneProjectRaw(requestParameters: FindOneProjectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProjectResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling findOneProject().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/project/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectResponseFromJSON(jsonValue));
    }

    /**
     * Get project by id
     */
    async findOneProject(requestParameters: FindOneProjectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProjectResponse> {
        const response = await this.findOneProjectRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async removeProjectRaw(requestParameters: RemoveProjectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling removeProject().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/project/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async removeProject(requestParameters: RemoveProjectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.removeProjectRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateProjectRaw(requestParameters: UpdateProjectOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProjectResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling updateProject().'
            );
        }

        if (requestParameters['updateProjectRequest'] == null) {
            throw new runtime.RequiredError(
                'updateProjectRequest',
                'Required parameter "updateProjectRequest" was null or undefined when calling updateProject().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/project/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateProjectRequestToJSON(requestParameters['updateProjectRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectResponseFromJSON(jsonValue));
    }

    /**
     */
    async updateProject(requestParameters: UpdateProjectOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProjectResponse> {
        const response = await this.updateProjectRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
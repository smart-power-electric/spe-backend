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

/**
 * 
 */
export class AppApi extends runtime.BaseAPI {

    /**
     */
    async getHelloRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async getHello(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.getHelloRaw(initOverrides);
    }

}
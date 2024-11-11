import localVarRequest from 'request';

export * from './applicationExceptionResponse';
export * from './clientPaginationResponse';
export * from './clientResponse';
export * from './createClientRequest';
export * from './createInvoicesRequest';
export * from './createMaterialRequest';
export * from './createNotificationsRequest';
export * from './createProjectQuotationRequest';
export * from './createProjectRequest';
export * from './createServiceRequest';
export * from './createServiceSheetsRequest';
export * from './createStageRequest';
export * from './createWorkerAssignmentRequest';
export * from './createWorkerPaymentsRequest';
export * from './createWorkerRatesRequest';
export * from './createWorkerRequest';
export * from './invoicesResponse';
export * from './materialResponse';
export * from './notificationsResponse';
export * from './projectQuotationResponse';
export * from './projectResponse';
export * from './serviceResponse';
export * from './serviceSheetsResponse';
export * from './stageResponse';
export * from './updateClientRequest';
export * from './updateInvoicesRequest';
export * from './updateMaterialRequest';
export * from './updateNotificationsRequest';
export * from './updateProjectQuotationRequest';
export * from './updateProjectRequest';
export * from './updateServiceRequest';
export * from './updateServiceSheetsRequest';
export * from './updateStageRequest';
export * from './updateWorkerAssignmentRequest';
export * from './updateWorkerPaymentsRequest';
export * from './updateWorkerRatesRequest';
export * from './updateWorkerRequest';
export * from './versionResponse';
export * from './workerAssignmentResponse';
export * from './workerPaymentsResponse';
export * from './workerRatesResponse';
export * from './workerResponse';

import * as fs from 'fs';

export interface RequestDetailedFile {
    value: Buffer;
    options?: {
        filename?: string;
        contentType?: string;
    }
}

export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile;


import { ApplicationExceptionResponse } from './applicationExceptionResponse';
import { ClientPaginationResponse } from './clientPaginationResponse';
import { ClientResponse } from './clientResponse';
import { CreateClientRequest } from './createClientRequest';
import { CreateInvoicesRequest } from './createInvoicesRequest';
import { CreateMaterialRequest } from './createMaterialRequest';
import { CreateNotificationsRequest } from './createNotificationsRequest';
import { CreateProjectQuotationRequest } from './createProjectQuotationRequest';
import { CreateProjectRequest } from './createProjectRequest';
import { CreateServiceRequest } from './createServiceRequest';
import { CreateServiceSheetsRequest } from './createServiceSheetsRequest';
import { CreateStageRequest } from './createStageRequest';
import { CreateWorkerAssignmentRequest } from './createWorkerAssignmentRequest';
import { CreateWorkerPaymentsRequest } from './createWorkerPaymentsRequest';
import { CreateWorkerRatesRequest } from './createWorkerRatesRequest';
import { CreateWorkerRequest } from './createWorkerRequest';
import { InvoicesResponse } from './invoicesResponse';
import { MaterialResponse } from './materialResponse';
import { NotificationsResponse } from './notificationsResponse';
import { ProjectQuotationResponse } from './projectQuotationResponse';
import { ProjectResponse } from './projectResponse';
import { ServiceResponse } from './serviceResponse';
import { ServiceSheetsResponse } from './serviceSheetsResponse';
import { StageResponse } from './stageResponse';
import { UpdateClientRequest } from './updateClientRequest';
import { UpdateInvoicesRequest } from './updateInvoicesRequest';
import { UpdateMaterialRequest } from './updateMaterialRequest';
import { UpdateNotificationsRequest } from './updateNotificationsRequest';
import { UpdateProjectQuotationRequest } from './updateProjectQuotationRequest';
import { UpdateProjectRequest } from './updateProjectRequest';
import { UpdateServiceRequest } from './updateServiceRequest';
import { UpdateServiceSheetsRequest } from './updateServiceSheetsRequest';
import { UpdateStageRequest } from './updateStageRequest';
import { UpdateWorkerAssignmentRequest } from './updateWorkerAssignmentRequest';
import { UpdateWorkerPaymentsRequest } from './updateWorkerPaymentsRequest';
import { UpdateWorkerRatesRequest } from './updateWorkerRatesRequest';
import { UpdateWorkerRequest } from './updateWorkerRequest';
import { VersionResponse } from './versionResponse';
import { WorkerAssignmentResponse } from './workerAssignmentResponse';
import { WorkerPaymentsResponse } from './workerPaymentsResponse';
import { WorkerRatesResponse } from './workerRatesResponse';
import { WorkerResponse } from './workerResponse';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

let enumsMap: {[index: string]: any} = {
}

let typeMap: {[index: string]: any} = {
    "ApplicationExceptionResponse": ApplicationExceptionResponse,
    "ClientPaginationResponse": ClientPaginationResponse,
    "ClientResponse": ClientResponse,
    "CreateClientRequest": CreateClientRequest,
    "CreateInvoicesRequest": CreateInvoicesRequest,
    "CreateMaterialRequest": CreateMaterialRequest,
    "CreateNotificationsRequest": CreateNotificationsRequest,
    "CreateProjectQuotationRequest": CreateProjectQuotationRequest,
    "CreateProjectRequest": CreateProjectRequest,
    "CreateServiceRequest": CreateServiceRequest,
    "CreateServiceSheetsRequest": CreateServiceSheetsRequest,
    "CreateStageRequest": CreateStageRequest,
    "CreateWorkerAssignmentRequest": CreateWorkerAssignmentRequest,
    "CreateWorkerPaymentsRequest": CreateWorkerPaymentsRequest,
    "CreateWorkerRatesRequest": CreateWorkerRatesRequest,
    "CreateWorkerRequest": CreateWorkerRequest,
    "InvoicesResponse": InvoicesResponse,
    "MaterialResponse": MaterialResponse,
    "NotificationsResponse": NotificationsResponse,
    "ProjectQuotationResponse": ProjectQuotationResponse,
    "ProjectResponse": ProjectResponse,
    "ServiceResponse": ServiceResponse,
    "ServiceSheetsResponse": ServiceSheetsResponse,
    "StageResponse": StageResponse,
    "UpdateClientRequest": UpdateClientRequest,
    "UpdateInvoicesRequest": UpdateInvoicesRequest,
    "UpdateMaterialRequest": UpdateMaterialRequest,
    "UpdateNotificationsRequest": UpdateNotificationsRequest,
    "UpdateProjectQuotationRequest": UpdateProjectQuotationRequest,
    "UpdateProjectRequest": UpdateProjectRequest,
    "UpdateServiceRequest": UpdateServiceRequest,
    "UpdateServiceSheetsRequest": UpdateServiceSheetsRequest,
    "UpdateStageRequest": UpdateStageRequest,
    "UpdateWorkerAssignmentRequest": UpdateWorkerAssignmentRequest,
    "UpdateWorkerPaymentsRequest": UpdateWorkerPaymentsRequest,
    "UpdateWorkerRatesRequest": UpdateWorkerRatesRequest,
    "UpdateWorkerRequest": UpdateWorkerRequest,
    "VersionResponse": VersionResponse,
    "WorkerAssignmentResponse": WorkerAssignmentResponse,
    "WorkerPaymentsResponse": WorkerPaymentsResponse,
    "WorkerRatesResponse": WorkerRatesResponse,
    "WorkerResponse": WorkerResponse,
}

// Check if a string starts with another string without using es6 features
function startsWith(str: string, match: string): boolean {
    return str.substring(0, match.length) === match;
}

// Check if a string ends with another string without using es6 features
function endsWith(str: string, match: string): boolean {
    return str.length >= match.length && str.substring(str.length - match.length) === match;
}

const nullableSuffix = " | null";
const optionalSuffix = " | undefined";
const arrayPrefix = "Array<";
const arraySuffix = ">";
const mapPrefix = "{ [key: string]: ";
const mapSuffix = "; }";

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string): any {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (endsWith(type, nullableSuffix)) {
            let subType: string = type.slice(0, -nullableSuffix.length); // Type | null => Type
            return ObjectSerializer.serialize(data, subType);
        } else if (endsWith(type, optionalSuffix)) {
            let subType: string = type.slice(0, -optionalSuffix.length); // Type | undefined => Type
            return ObjectSerializer.serialize(data, subType);
        } else if (startsWith(type, arrayPrefix)) {
            let subType: string = type.slice(arrayPrefix.length, -arraySuffix.length); // Array<Type> => Type
            let transformedData: any[] = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.serialize(datum, subType));
            }
            return transformedData;
        } else if (startsWith(type, mapPrefix)) {
            let subType: string = type.slice(mapPrefix.length, -mapSuffix.length); // { [key: string]: Type; } => Type
            let transformedData: { [key: string]: any } = {};
            for (let key in data) {
                transformedData[key] = ObjectSerializer.serialize(
                    data[key],
                    subType,
                );
            }
            return transformedData;
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string): any {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (endsWith(type, nullableSuffix)) {
            let subType: string = type.slice(0, -nullableSuffix.length); // Type | null => Type
            return ObjectSerializer.deserialize(data, subType);
        } else if (endsWith(type, optionalSuffix)) {
            let subType: string = type.slice(0, -optionalSuffix.length); // Type | undefined => Type
            return ObjectSerializer.deserialize(data, subType);
        } else if (startsWith(type, arrayPrefix)) {
            let subType: string = type.slice(arrayPrefix.length, -arraySuffix.length); // Array<Type> => Type
            let transformedData: any[] = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.deserialize(datum, subType));
            }
            return transformedData;
        } else if (startsWith(type, mapPrefix)) {
            let subType: string = type.slice(mapPrefix.length, -mapSuffix.length); // { [key: string]: Type; } => Type
            let transformedData: { [key: string]: any } = {};
            for (let key in data) {
                transformedData[key] = ObjectSerializer.deserialize(
                    data[key],
                    subType,
                );
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class HttpBearerAuth implements Authentication {
    public accessToken: string | (() => string) = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            const accessToken = typeof this.accessToken === 'function'
                            ? this.accessToken()
                            : this.accessToken;
            requestOptions.headers["Authorization"] = "Bearer " + accessToken;
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        } else if (this.location == 'cookie' && requestOptions && requestOptions.headers) {
            if (requestOptions.headers['Cookie']) {
                requestOptions.headers['Cookie'] += '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
            else {
                requestOptions.headers['Cookie'] = this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}

export type Interceptor = (requestOptions: localVarRequest.Options) => (Promise<void> | void);

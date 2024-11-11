export * from './clientApi';
import { ClientApi } from './clientApi';
export * from './defaultApi';
import { DefaultApi } from './defaultApi';
export * from './invoicesApi';
import { InvoicesApi } from './invoicesApi';
export * from './materialApi';
import { MaterialApi } from './materialApi';
export * from './notificationsApi';
import { NotificationsApi } from './notificationsApi';
export * from './projectApi';
import { ProjectApi } from './projectApi';
export * from './projectQuotationApi';
import { ProjectQuotationApi } from './projectQuotationApi';
export * from './serviceApi';
import { ServiceApi } from './serviceApi';
export * from './serviceSheetsApi';
import { ServiceSheetsApi } from './serviceSheetsApi';
export * from './stageApi';
import { StageApi } from './stageApi';
export * from './workerApi';
import { WorkerApi } from './workerApi';
export * from './workerAssignmentApi';
import { WorkerAssignmentApi } from './workerAssignmentApi';
export * from './workerPaymentsApi';
import { WorkerPaymentsApi } from './workerPaymentsApi';
export * from './workerRatesApi';
import { WorkerRatesApi } from './workerRatesApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [ClientApi, DefaultApi, InvoicesApi, MaterialApi, NotificationsApi, ProjectApi, ProjectQuotationApi, ServiceApi, ServiceSheetsApi, StageApi, WorkerApi, WorkerAssignmentApi, WorkerPaymentsApi, WorkerRatesApi];

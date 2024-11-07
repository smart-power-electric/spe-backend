// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
// import {
//   CompositePropagator,
//   W3CTraceContextPropagator,
//   W3CBaggagePropagator,
// } from '@opentelemetry/core';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { Resource } from '@opentelemetry/resources';
// import * as opentelemetry from '@opentelemetry/sdk-node';
// import {
//   BatchSpanProcessor,
//   ConsoleSpanExporter,
//   SimpleSpanProcessor,
// } from '@opentelemetry/sdk-trace-node';
// import { ExpressLayerType, ExpressRequestInfo } from '@opentelemetry/instrumentation-express';
// import {
//   SEMATTRS_HTTP_METHOD,
//   SEMATTRS_HTTP_URL,
//   SEMRESATTRS_SERVICE_NAME,
// } from '@opentelemetry/semantic-conventions';
// import { Span } from '@opentelemetry/api';
// import { B3Propagator, B3InjectEncoding } from '@opentelemetry/propagator-b3';
// import { config } from 'dotenv';
// config();

// // opentelemetry.api.propagation.setGlobalPropagator(new B3Propagator());
// const _SERVICE_NAME = process.env.OTEL_SERVICE_NAME ?? 'honest-game-backend-api';

// function getOTELExporter() {
//   if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
//     const exporterOptions = {
//       url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318/v1/trace',
//     };
//     const traceExporter = new OTLPTraceExporter(exporterOptions);
//     return traceExporter;
//   }
//   return new ConsoleSpanExporter();
// }
// function getSpanProcessor() {
//   if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
//     return new BatchSpanProcessor(getOTELExporter());
//   }
//   return new SimpleSpanProcessor(new ConsoleSpanExporter());
// }
// const auto = getNodeAutoInstrumentations({
//   '@opentelemetry/instrumentation-pg': {
//     enhancedDatabaseReporting: true,
//     addSqlCommenterCommentToQueries: true,
//     requireParentSpan: true,
//     responseHook: (span, response) => {
//       span.setAttribute('db.response.rows', response.data.rowCount);
//     },
//     requestHook: (span, request) => {
//       // eslint-disable-next-line no-console
//       span.setAttribute('db.request.query.name', request.query.name ?? '');
//       span.setAttribute('db.request.query.text', request.query.text ?? '');
//       span.setAttribute('db.request.query.values', request.query.values?.join(', ') ?? '');
//     },
//   },
//   '@opentelemetry/instrumentation-express': {
//     requestHook: function (span: Span, info: ExpressRequestInfo) {
//       if (info.layerType === ExpressLayerType.REQUEST_HANDLER) {
//         // eslint-disable-next-line no-console
//         span.setAttribute(SEMATTRS_HTTP_METHOD, info.request.method);
//         span.setAttribute(SEMATTRS_HTTP_URL, info.request.baseUrl);
//       }
//     },
//   },
// });
// const sdk = new opentelemetry.NodeSDK({
//   resource: new Resource({
//     [SEMRESATTRS_SERVICE_NAME]: _SERVICE_NAME,
//   }),
//   spanProcessors: [getSpanProcessor()],
//   textMapPropagator: new CompositePropagator({
//     propagators: [
//       new W3CTraceContextPropagator(),
//       new W3CBaggagePropagator(),
//       new B3Propagator(),
//       new B3Propagator({
//         injectEncoding: B3InjectEncoding.MULTI_HEADER,
//       }),
//     ],
//   }),
//   instrumentations: [auto],
// });
// process.on('SIGTERM', () => {
//   sdk
//     .shutdown()
//     // eslint-disable-next-line no-console
//     .then(() => console.log('Tracing terminated'))
//     // eslint-disable-next-line no-console
//     .catch(error => console.log('Error terminating tracing', error))
//     .finally(() => process.exit(0));
// });
// sdk.start();
// export default sdk;

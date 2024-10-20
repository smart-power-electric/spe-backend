import { UserInfo } from "../keycloak/keycloak.entity";
import { trace, context } from '@opentelemetry/api';

/**
 * Context model
 * @export
 * @interface Context
 */
export interface Context {
  startTime: Date;
  requestId: string;
  payload: Record<string, string | number | Date>;
  user: UserInfo | null;
}

export function generateContextId(): string {
  const activeSpan = trace.getSpan(context.active());
  if (!activeSpan) {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }
  const traceId = activeSpan.spanContext().traceId;
  // const spanId = activeSpan.spanContext().spanId;
  // const traceFlag = activeSpan.spanContext().traceFlags;

  return traceId;
}
export function newContext(): Context {
  return {
    startTime: new Date(),
    requestId: generateContextId(),
    user: null,
    payload: {},
  };
}
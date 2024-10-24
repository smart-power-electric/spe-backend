import { UserInfo } from '../keycloak/keycloak.entity';

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
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
export function newContext(): Context {
  return {
    startTime: new Date(),
    requestId: generateContextId(),
    user: null,
    payload: {},
  };
}

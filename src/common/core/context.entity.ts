export type UserLoginInfo = {
  userId: string;
  email: string;
  name: string;
  role: string;
};
/**
 * Context model
 * @export
 * @interface Context
 */
export interface Context {
  startTime: Date;
  requestId: string;
  payload: Record<string, string | number | Date>;
  user: UserLoginInfo | null;
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

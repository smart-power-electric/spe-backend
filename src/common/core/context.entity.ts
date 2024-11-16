import { JwtAccessTokenPayload } from 'src/security/core/auth.jwt.entity';

export type UserLoginInfo = {
  userId: string;
  email: string;
  name: string;
  roles: string[];
};
/**
 * Context model
 * @export
 * @interface Context
 */
export interface Context {
  startTime: Date;
  requestId: string;
  payload?: JwtAccessTokenPayload | null;
  user: UserLoginInfo | null;
  isImpersonated: boolean;
  roles: string[];
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
    isImpersonated: false,
    roles: [],
  };
}

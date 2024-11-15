export type Sub = {
  id: string;
  email: string;
};
export type JwtAccessTokenPayload = {
  sub: string;
  email: string;
  role: string | null;
  isImpersonation: boolean;
  iss: string;
  aud: string;
};

export type JwtRefreshTokenPayload = {
  sub: string;
  email: string;
  type: string;
};

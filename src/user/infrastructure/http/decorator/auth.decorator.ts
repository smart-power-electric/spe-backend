import { SetMetadata } from '@nestjs/common';

export const IMPERSONATE_PROTECT_KEY = 'impersonate_protected';
export const ImpersonateProtection = () =>
  SetMetadata(IMPERSONATE_PROTECT_KEY, true);

import { RequiredActionAlias } from '@keycloak/keycloak-admin-client/lib/defs/requiredActionProviderRepresentation.js';

const AuthRoles = {
  SuperAdmin: 'SuperAdmin',
  Admin: 'Admin',
  ProgramLeader: 'ProgramLeader',
  Interventionist: 'Interventionist',
  Teacher: 'Teacher',
  Principal: 'Principal',
  Student: 'Student',
} as const;

type AuthRolesType = (typeof AuthRoles)[keyof typeof AuthRoles];

type RealmRolesType = {
  [K in keyof typeof AuthRoles]: `realm:${(typeof AuthRoles)[K]}`;
};

const RealmRoles: RealmRolesType = {
  SuperAdmin: 'realm:SuperAdmin',
  Admin: 'realm:Admin',
  ProgramLeader: 'realm:ProgramLeader',
  Interventionist: 'realm:Interventionist',
  Teacher: 'realm:Teacher',
  Principal: 'realm:Principal',
  Student: 'realm:Student',
} as const;

const HierarchyLevel = {
  MX: 'mx',
  District: 'district',
  School: 'school',
  Student: 'student',
} as const;

type HierarchyLevelType = (typeof HierarchyLevel)[keyof typeof HierarchyLevel];

interface RealmAccess {
  roles: string[];
}

interface UserInfo {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: RealmAccess;
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  extra_permissions?: string[];
  given_name: string;
  family_name: string;
  email: string;
}

interface KeycloakUser {
  username: string;
  enabled: boolean;
  id: string;
  emailVerified: boolean;
  requiredActions: (RequiredActionAlias | string)[];
  attributes: Record<string, any>;
  email: string;
  firstName: string;
  lastName: string;
  realmRoles: string[];
}

export {
  AuthRoles,
  AuthRolesType,
  HierarchyLevel,
  HierarchyLevelType,
  RealmAccess,
  RealmRoles,
  RealmRolesType,
  UserInfo,
  KeycloakUser,
};

export const EmailActionOptions = {
  VerifyEmail: 'VERIFY_EMAIL',
  VerifyProfile: 'VERIFY_PROFILE',
  UpdateProfile: 'UPDATE_PROFILE',
  UpdateEmail: 'UPDATE_EMAIL',
  UpdatePassword: 'UPDATE_PASSWORD',
  ConfigureTotp: 'CONFIGURE_TOTP',
  ConfigureRecoveryAuthCodes: 'CONFIGURE_RECOVERY_AUTHN_CODES',
  TermsAndConditions: 'TERMS_AND_CONDITIONS',
} as const;

export type EmailAction = (typeof EmailActionOptions)[keyof typeof EmailActionOptions];

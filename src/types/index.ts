export * from "./component.types";

export interface TokenTypes {
  areaId: null;
  nationalId: null;
  phoneNumber: string;
  regionalId: string[];
  roles: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  firebase: Firebase;
}

export interface Identities {}

export interface Firebase {
  identities: Identities;
  sign_in_provider: string;
}

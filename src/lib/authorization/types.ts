export type AuthorizationToken = {
    access_token: string;
    token_type: string;
    expires_in: number;
    created_at: number;
}

export type IntrospectedAuthorizationToken = {
    active: boolean;
    scope: string;
    client_id: string;
    token_type: string;
    exp: number;
    iat: number;
  }
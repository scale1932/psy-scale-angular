
export interface User {
  id: number;
  username?: string;
  email?: string;
  roles?: string[];
}

export interface AccessToken {
  token_type: 'Bearer';
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

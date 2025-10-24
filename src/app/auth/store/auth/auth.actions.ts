import { User } from "../../models/auth-user";

// login.actions.ts
export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { username: string; password: string }) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] Login Success';
  constructor(public payload: { access_token: string; refreshToken: string; user: User }) {}
}

export class LoginFailed {
  static readonly type = '[Auth] Login Failed';
  constructor(public error: string) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class RefreshToken {
  static readonly type = '[Auth] Refresh Token';
}

export class RefreshTokenSuccess {
  static readonly type = '[Auth] Refresh Token Success';
  constructor(public payload: { token: string; refreshToken: string }) {}
}

export class CheckAuthStatus {
  static readonly type = '[Auth] Check Auth Status';
}

export class CheckPermissions {
  static readonly type = '[Auth] Check Permissions';
  constructor(public requiredPermissions: string[]) {}
}

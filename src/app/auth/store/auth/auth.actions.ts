import {LoginRequest, LoginResponseData} from '../../../models/auth.model';

// login.actions.ts
export class LoginAuth {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoginRequest) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] Login Success';
  constructor(public payload: LoginResponseData) {}
}

export class LoginFailed {
  static readonly type = '[Auth] Login Failed';
  constructor(public error: string) {}
}

export class LogoutAuth {
  static readonly type = '[Auth] Logout';
}

export class RefreshToken {
  static readonly type = '[Auth] Refresh Token';
}

export class RefreshTokenSuccess {
  static readonly type = '[Auth] Refresh Token Success';
  constructor(public payload: LoginResponseData) {}
}

export class CheckAuthStatus {
  static readonly type = '[Auth] Check Auth Status';
}

export class CheckPermissions {
  static readonly type = '[Auth] Check Permissions';
  constructor(public requiredPermissions: string[]) {}
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(readonly username: string, readonly password: string, readonly captchaCode: string) { }
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class RefreshToken {
  static readonly type = '[Auth] Refresh Token';
}

export class FetchAuthUser {
  static readonly type = '[Auth] Load User Profile';
}

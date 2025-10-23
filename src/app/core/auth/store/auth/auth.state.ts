import { Injectable, inject } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CheckPermissions, Login, LoginSuccess, RefreshToken, RefreshTokenSuccess } from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/auth-user';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthStateModel {
  access_token: string | null;
  refreshToken: string | null;
  user: User | null;
  permissions: string[];
  isAuthenticated: boolean;
  tokenExpiration: number | null;
}

// login.state.ts
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    access_token: null,
    refreshToken: null,
    user: null,
    permissions: [],
    isAuthenticated: false,
    tokenExpiration: null
  }
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, private router: Router) {}

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static hasPermissions(state: AuthStateModel): (requiredPermissions: string[]) => boolean {
    return (requiredPermissions: string[]) => {
      if (!requiredPermissions.length) return true;
      return requiredPermissions.every(permission =>
        state.permissions.includes(permission)
      );
    };
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((response: any) => {
        ctx.dispatch(new LoginSuccess({
          access_token: response.access_token,
          refreshToken: response.refresh_token,
          user: response.user
        }));
      })
    );
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
    const { access_token, refreshToken, user } = action.payload;

    // 存储到本地
    this.authService.storeTokens(access_token, refreshToken);

    // 更新状态
    ctx.patchState({
      access_token,
      refreshToken,
      user,
      isAuthenticated: true,
      //permissions: user.roles.flatMap(role => role.permissions)
      permissions: []
    });

    // 导航到首页
    this.router.navigate(['/dashboard']);
  }

  @Action(RefreshToken)
  refreshToken(ctx: StateContext<AuthStateModel>) {
    return this.authService.refreshToken().pipe(
      tap((response: any) => {
        ctx.dispatch(new RefreshTokenSuccess({
          token: response.access_token,
          refreshToken: response.refresh_token
        }));
      })
    );
  }

  @Action(CheckPermissions)
  checkPermissions(ctx: StateContext<AuthStateModel>, action: CheckPermissions) {
    const state = ctx.getState();
    const hasAccess = action.requiredPermissions.every(permission =>
      state.permissions.includes(permission)
    );

    if (!hasAccess) {
      this.router.navigate(['/unauthorized']);
    }

    return hasAccess;
  }
}

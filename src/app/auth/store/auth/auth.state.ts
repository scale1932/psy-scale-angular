import {Injectable} from '@angular/core';
import {State, Action, Selector, StateContext} from '@ngxs/store';
import {
  CheckPermissions,
  LoginAuth,
  LoginFailed,
  LoginSuccess, LogoutAuth,
  RefreshTokenSuccess
} from './auth.actions';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/auth-user';
import {catchError, tap, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {LoginResponseData} from '../../../models/auth.model';

export interface AuthStateModel {
  accessToken: string | null;
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
    accessToken: null,
    refreshToken: null,
    user: null,
    permissions: [],
    isAuthenticated: false,
    tokenExpiration: null
  }
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, private router: Router) {
  }

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

  @Action(LoginAuth)
  login(ctx: StateContext<AuthStateModel>, action: LoginAuth) {
    return this.authService.login(action.payload).pipe(
      tap((response: LoginResponseData) => {
        ctx.dispatch(new LoginSuccess(response));
      }),
      catchError(error => {
        ctx.dispatch(new LoginFailed(error.message || '登录失败'));
        return throwError(() => error);
      })
    );
  }

  @Action(LoginFailed)
  loginFailed(ctx: StateContext<AuthStateModel>, action: LoginFailed) {
    ctx.patchState({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      permissions: []
    });
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
    // 存储到本地
    this.authService.storeTokens(action.payload);

    // 更新状态
    ctx.patchState({
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
      isAuthenticated: true,
      user: {id: action.payload.userId},
      //permissions: user.roles.flatMap(role => role.permissions)
      permissions: []
    });

    // 导航到首页
    this.router.navigate(['/home']);
  }

  @Action(LogoutAuth)
  logout(ctx: StateContext<AuthStateModel>) {
    // TODO 需要看下是否需要修改逻辑
    this.authService.logout().pipe(
      tap((response: boolean) => {
        ctx.patchState({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          permissions: []
        });
      })
    );
    this.router.navigate(['/login']);
  }

  @Action(RefreshTokenSuccess)
  refreshToken(ctx: StateContext<AuthStateModel>) {
    return this.authService.refreshToken().pipe(
      tap((response: LoginResponseData) => {
        ctx.patchState({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          isAuthenticated: true
        })
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

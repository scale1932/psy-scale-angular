import { Injectable, inject } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { FetchAuthUser, Login } from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { User, TokenStatus } from '../../models/auth-user';
import { TokenStorageService } from '../../services/token.storage.service';
import { catchError, switchMap, throwError } from 'rxjs';

export interface AuthStateModel {
  isLoggedIn: boolean;
  user?: User;
  hasLoginError: boolean;
  isLoadingLogin: boolean;
  accessTokenStatus: TokenStatus;
  refreshTokenStatus: TokenStatus;
}

const initialState: AuthStateModel = {
  isLoggedIn: false,
  user: undefined,
  hasLoginError: false,
  isLoadingLogin: false,
  accessTokenStatus: TokenStatus.PENDING,
  refreshTokenStatus: TokenStatus.PENDING
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: initialState
})
@Injectable()
export class AuthState {

  private readonly authService = inject(AuthService);
  private readonly tokenStorageService = inject(TokenStorageService);

  @Selector()
  static getState(state: AuthStateModel) {
    return state;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    this.authService.login(action.username, action.password, action.captchaCode).pipe(
      switchMap(token => {
        this.tokenStorageService.saveToken(token);
        ctx.patchState({
          isLoggedIn: true,
          hasLoginError: false,
          isLoadingLogin: false,
          accessTokenStatus: TokenStatus.VALID,
          refreshTokenStatus: TokenStatus.VALID
        });

        // Redirect to return url or home
        // const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        // this.router.navigateByUrl(returnUrl);
        return ctx.dispatch(new FetchAuthUser());
      }),
      catchError(err => {
        ctx.patchState({
          isLoggedIn: false,
          hasLoginError: true,
          isLoadingLogin: false,
          accessTokenStatus: TokenStatus.INVALID,
          refreshTokenStatus: TokenStatus.INVALID
        });

        this.tokenStorageService.removeToken();
        return throwError(() => err);
      }
    ));
  }

  @Action(FetchAuthUser)
  fetchAuthUser(ctx: StateContext<AuthStateModel>) {
    //return this.authService.fetchAuthUser().pipe();
  }

}

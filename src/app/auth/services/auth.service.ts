import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AccessToken } from '../models/auth-user';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { CheckAuthStatus, LoginFailed, Logout } from '../store/auth/auth.actions';
import { environment } from "../../../environments/environment";


// login.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private  readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly baseUrl = environment.api.baseUrl;
  // const url = `${environment.api.authUrl}/login`;

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  initializeAuth(): void {
    this.store.dispatch(new CheckAuthStatus());
  }

  login(credentials: { username: string; password: string }): Observable<AccessToken> {
    // return this.http.post('/api/login/login', credentials).pipe(
    //   catchError(error => {
    //     this.store.dispatch(new LoginFailed(error.message));
    //     return throwError(() => error);
    //   })
    // );
    return of({
      access_token: 'dummy_access_token',
      refresh_token: 'dummy_refresh_token',
      expires_in: 3600,
      token_type: 'Bearer'
    });
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    return this.http.post('/api/auth/refresh', { refreshToken }).pipe(
      catchError(error => {
        this.store.dispatch(new Logout());
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  storeTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  // 根据环境判断是否使用mock数据
  // getUsers(): Observable<User[]> {
  //   if (environment.pages.enableMock) {
  //     return of(this.getMockUsers());
  //   }
  //   return this.http.get<User[]>(`${this.baseUrl}/users`);
  // }
}

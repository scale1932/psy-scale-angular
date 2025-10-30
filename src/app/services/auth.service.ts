import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {CheckAuthStatus, RefreshTokenSuccess} from '../auth/store/auth/auth.actions';
import {LoginRequest, LoginResponse, LoginResponseData, LogoutResponse} from '../models/auth.model';
import {map} from 'rxjs/operators';
import {BaseService} from './base.service';

// login.service.ts
@Injectable({providedIn: 'root'})
export class AuthService extends BaseService{

  constructor(
    private store: Store
  ) {
    super();
  }

  initializeAuth(): void {
    this.store.dispatch(new CheckAuthStatus());
  }

  login(credentials: LoginRequest): Observable<LoginResponseData> {
    return this.httpClient.post<LoginResponse>(this.baseUrl + '/system/auth/login', credentials).pipe(
      map(response => {
        if (response.code !== 0) {
          throw new Error(response.msg || '登录失败');
        }
        return response.data!;
      })
    );
  }

  refreshToken(): Observable<LoginResponseData> {
    return this.httpClient.post<LoginResponse>(this.baseUrl + '/system/auth/refresh-token', {
      setHeaders:
        {
          Authorization: `Bearer ${localStorage.getItem(this.TOKEN_KEY)}`,
          'tenant-id': 1
        }
    }).pipe(
      map(response => {
        if (response.code !== 0) {
          throw new Error(response.msg || '刷新Token失败');
        }
        this.storeTokens(response.data!)
        this.store.dispatch(new RefreshTokenSuccess(response.data!))
        return response.data!;
      })
    );
  }

  logout(): Observable<boolean> {
    // TODO 需要看下是否需要修改逻辑
    this.clearTokens();
    // 调用服务端的 logout 接口
    return this.httpClient.post<LogoutResponse>(this.baseUrl + '/system/auth/logout', {}).pipe(
      map(response => {
        if (response.code !== 0) {
          throw new Error(response.msg || '登出失败');
        }
        return response.data!;
      })
    );
  }

  storeTokens(payload: LoginResponseData): void {
    localStorage.setItem(this.TOKEN_KEY, payload.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, payload.refreshToken);
    localStorage.setItem(this.TOKEN_EXPIRATION_KEY, payload.expiresTime);
  }

  clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRATION_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

}

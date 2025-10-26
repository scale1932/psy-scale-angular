import {HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {LoginResponseData} from '../../models/auth.model';
import {Store} from '@ngxs/store';
import {LogoutAuth} from '../store/auth/auth.actions';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const store = inject(Store);

  // 登录和注册接口不需要添加 token
  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  // 从localStorage 获取 accessToken
  const accessToken = authService.getAccessToken();

  // 如果没有token，直接发送请求: 比如白名单的页面，不需要登录也可以访问
  if (!accessToken) {
    return next(req);
  }

  // 检查token是否即将过期
  if (isTokenExpiring(accessToken)) {
    // 调用刷新token接口
    return authService.refreshToken().pipe(
      switchMap((response: LoginResponseData) => {
        // 克隆请求并添加新的Authorization头
        return next(cloneRequestWithBearerToken(req, response.accessToken));
      }),
      catchError(error => {
        // 刷新失败，清除token并跳转到登录页
        store.dispatch(new LogoutAuth());
        return throwError(() => error);
      })
    );
  } else {
    return next(cloneRequestWithBearerToken(req, accessToken));
  }
};

function cloneRequestWithBearerToken(req: HttpRequest<unknown>, accessToken: string): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

// 检查token是否即将过期（在过期前5分钟刷新）
function isTokenExpiring(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000; // 转换为毫秒
    const now = Date.now();
    // 在过期前5分钟刷新
    return (expiration - now) < 5 * 60 * 1000;
  } catch {
    return false;
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Logout, RefreshToken } from './store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(AuthService.TOKEN_KEY);
     if (token && this.isTokenExpiring(token)) {
      // Token即将过期，自动刷新
      this.store.dispatch(new RefreshToken());
    }

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.store.dispatch(new Logout());
        }
        return throwError(() => error);
      })
    );
  }

  private isTokenExpiring(token: string): boolean {
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

}

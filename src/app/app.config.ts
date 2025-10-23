import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {withNgxsReduxDevtoolsPlugin} from '@ngxs/devtools-plugin';
import {withNgxsFormPlugin} from '@ngxs/form-plugin';
import {withNgxsLoggerPlugin} from '@ngxs/logger-plugin';
import {withNgxsRouterPlugin} from '@ngxs/router-plugin';
// import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import {withNgxsWebSocketPlugin} from '@ngxs/websocket-plugin';
import {provideStore} from '@ngxs/store';
import {AuthState} from './core/auth/store/auth/auth.state';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './core/auth/interceptors/token.interceptor';
import {withInterceptorsFromDi} from '@angular/common/http';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideNzI18n(en_US), provideAnimationsAsync(), provideHttpClient(),
    provideStore([AuthState]),
    withNgxsReduxDevtoolsPlugin(),
    withNgxsFormPlugin(),
    withNgxsLoggerPlugin(),
    withNgxsRouterPlugin(),
    // 使用 provideHttpClient 并启用 DI 方式的拦截器
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    // 像在 NgModule 中一样提供拦截器类
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true // multi: true 很重要，因为可能有多个拦截器
    },
    // withNgxsStoragePlugin(),
    // withNgxsWebSocketPlugin()
  ]
};

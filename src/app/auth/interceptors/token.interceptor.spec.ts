import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideStore} from '@ngxs/store';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';

describe('TokenInterceptor', () => {
  let service: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideStore(),
        provideRouter(routes)
      ]
    });
    service = TestBed.inject(TokenInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

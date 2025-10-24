import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthGuard } from '../../../../app/auth/guards/auth.guard';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideStore} from '@ngxs/store';
import {provideRouter} from '@angular/router';
import {routes} from '../../../../app/app.routes';

describe('AuthGuard', () => {
  let service: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideStore(),
        provideRouter(routes),
      ]
    });
    service = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

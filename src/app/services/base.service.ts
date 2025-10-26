import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';

export abstract class BaseService {
  protected readonly TOKEN_KEY = 'accessToken';
  protected readonly REFRESH_TOKEN_KEY = 'refreshToken';
  protected readonly TOKEN_EXPIRATION_KEY = 'expiresTime';
  protected readonly baseUrl = environment.api.baseUrl;
  protected readonly httpClient = inject(HttpClient);
}

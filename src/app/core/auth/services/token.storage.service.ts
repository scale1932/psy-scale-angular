import { Injectable } from '@angular/core';
import { AccessToken} from '../models/auth-user'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  saveToken(token: AccessToken): void {
    localStorage.setItem('psy_scale_access_token', token.access_token);
    localStorage.setItem('psy_scale_expires_in', token.expires_in.toString());
    localStorage.setItem('psy_scale_token_type', token.token_type);
    localStorage.setItem('psy_scale_refresh_token', token.refresh_token);
  }

  removeToken(): void {
    localStorage.removeItem('psy_scale_access_token');
    localStorage.removeItem('psy_scale_expires_in');
    localStorage.removeItem('psy_scale_token_type');
    localStorage.removeItem('psy_scale_refresh_token');
  }
}

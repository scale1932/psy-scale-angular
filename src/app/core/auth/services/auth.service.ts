import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessToken } from '../models/auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(username: string, password: string, captchaCode: string): Observable<AccessToken> {
    return new Observable<AccessToken>();
  }
}

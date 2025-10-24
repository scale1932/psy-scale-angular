import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth/auth.state';
import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { CheckPermissions } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredPermissions = route.data['permissions'] || [];

    return this.store.select(AuthState.isAuthenticated).pipe(
      take(1),
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
          return of(false);
        }

        if (requiredPermissions.length > 0) {
          return this.store.dispatch(new CheckPermissions(requiredPermissions)).pipe(
            map(() => true)
          );
        }

        return of(true);
      })
    );
  }
}

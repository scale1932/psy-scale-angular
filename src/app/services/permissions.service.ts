import {DestroyRef, inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService extends BaseService{

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    super();
  }

  listUserRoles(userId: number): void {
    this.httpClient.get<number[]>(this.baseUrl + '/system/permission/list-user-roles?userId=' + userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
      console.log('检索用户角色成功!!!!!', data);
    });
  }

}

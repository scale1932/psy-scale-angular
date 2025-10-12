import { Injectable } from '@angular/core';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public getMenuList(): Menu[] {
    return [
      { id: 1, name: '首页', level: 1, order: 1 },
      { id: 2, name: '心理测评', level: 1, order: 2 },
      { id: 3, name: '我的测评', level: 1, order: 3 },
      { id: 4, name: '关于我们', level: 1, order: 4 },
      { id: 5, name: '登录注册', level: 1, order: 5 },
      { id: 6, name: '抑郁测评', level: 2, order: 6 },
      { id: 7, name: '焦虑测评', level: 2, order: 1, parentId: 2 },
      { id: 8, name: '其他测评', level: 2, order: 2, parentId: 2 }
    ];
  }
}

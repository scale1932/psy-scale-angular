import { Injectable } from '@angular/core';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public getMenuList(): Menu[] {
    return [
      { id: 1, name: 'Home', level: 1, order: 1, path: '/home' },
      { id: 2, name: 'PsyScale', level: 1, order: 2, path: '/evaluation' },
      { id: 3, name: 'MyEvaluations', level: 1, order: 3, path: '/my-evaluations' },
      { id: 4, name: 'About', level: 1, order: 4, path: '/about' },
      { id: 5, name: 'Login', level: 1, order: 5, path: '/login' },
      { id: 6, name: 'Evaluation-Health', level: 2, order: 6, parentId: 2, path: '/evaluation/health' },
      { id: 7, name: 'Evaluation-Career', level: 2, order: 7, parentId: 2, path: '/evaluation/career' },
      { id: 8, name: 'Evaluation-Others', level: 2, order: 8, parentId: 2, path: '/evaluation/others' }
    ];
  }
}

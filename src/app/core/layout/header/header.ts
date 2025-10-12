import { Component, inject } from '@angular/core';
import { MenuService } from './services/menu.service';
import { Menu } from './models/menu.model';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NzDropDownModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  providers: [MenuService]
})
export class Header {
  private menuService = inject(MenuService);

    // 将扁平数据转换为树形结构
  get menuTree(): Menu[] {
    const menus = this.menuService.getMenuList();
    const topLevelMenus = menus
      .filter(menu => menu.level === 1)
      .sort((a, b) => a.order - b.order);

    // 为每个一级菜单添加子菜单
    return topLevelMenus.map(menu => ({
      ...menu,
      children: menus
        .filter(child => child.parentId === menu.id)
        .sort((a, b) => a.order - b.order)
    }));
  }

  getMenuDropdownId(menuId: number): string {
    return `menu-dropdown-${menuId}`;
  }

  // 菜单点击处理
  onMenuClick(menu: Menu): void {
    console.log('菜单点击:', menu);
    // 这里可以添加路由导航或其他业务逻辑
    switch(menu.id) {
      case 1:
        // 跳转到首页
        break;
      case 6:
        // 跳转到抑郁测评
        break;
      // ... 其他菜单处理
    }
  }
}

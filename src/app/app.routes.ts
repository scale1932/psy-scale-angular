import { Routes } from '@angular/router';
import { Home } from './core/features/home/home';
import { NotFound } from './core/error/not-found/not-found';
import { About } from './core/features/about/about';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { LoginPage } from './core/auth/login.page/login.page';

// 路由嵌套，注意这里的 path，永远不要以 / 开头
export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  { path: '', component: Home, canActivate: [AuthGuard] },
  { path: 'home', component: Home, canActivate: [AuthGuard]  },
  { path: 'about', component: About, canActivate: [AuthGuard]  },
  { path: 'my-evaluations', component: Home, canActivate: [AuthGuard]  },
  { path: 'login', component: Home, canActivate: [AuthGuard]  },
  { path: 'evaluation', component: Home, canActivate: [AuthGuard] , children: [
    {path: 'health', component: Home},
    {path: 'career', component: Home},
    {path: 'others', component: Home}
  ] },
  { path: '**', component: NotFound },
];

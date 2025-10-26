import {Routes} from '@angular/router';
import {Home} from './pages/home/home';
import {NotFound} from './pages/error/not-found/not-found';
import {About} from './pages/about/about';
import {AuthGuard} from './auth/guards/auth.guard';

// 路由嵌套，注意这里的 path，永远不要以 / 开头
export const routes: Routes = [
  {path: '', component: Home},
  {path: 'home', component: Home, canActivate: [AuthGuard]},
  {path: 'about', component: About, canActivate: [AuthGuard]},
  {path: 'my-evaluations', component: Home, canActivate: [AuthGuard]},
  {path: 'login', component: Home, canActivate: [AuthGuard]},
  {
    path: 'evaluation', component: Home, canActivate: [AuthGuard], children: [
      {path: 'health', component: Home},
      {path: 'career', component: Home},
      {path: 'others', component: Home}
    ]
  },
  {path: '**', component: NotFound},
];

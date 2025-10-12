import { Routes } from '@angular/router';
import { Home } from './core/features/home/home';
import { NotFound } from './core/error/not-found/not-found';
import { About } from './core/features/about/about';

// 路由嵌套，注意这里的 path，永远不要以 / 开头
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'my-evaluations', component: Home },
  { path: 'login', component: Home },
  { path: 'evaluation', component: Home, children: [
    {path: 'health', component: Home},
    {path: 'career', component: Home},
    {path: 'others', component: Home}
  ] },
  { path: '**', component: NotFound },
];

import { Routes } from '@angular/router';
import { Home } from './core/features/home/home';
import { NotFound } from './core/error/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: '**', component: NotFound }
];

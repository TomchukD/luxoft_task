import { Routes } from '@angular/router';
import { LoginPage } from 'src/app/pages/login/login-page.component';
import { UsersListPage } from 'src/app/pages/users/users-list.component';
import { authGuard } from 'src/app/guard/auth-guard';
import { NotFoundPage } from 'src/app/pages/not-found-page/not-found-page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'users',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: UsersListPage,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: NotFoundPage,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

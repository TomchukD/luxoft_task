import { Routes } from '@angular/router';
import { LoginPage } from 'src/app/pages/login/login-page.component';
import { UsersListPage } from 'src/app/pages/users/users-list.component';
import { authGuard } from 'src/app/Guard/auth-guard';
import { NotFoundPage } from 'src/app/pages/not-found-page/not-found-page';
import { UserPage } from 'src/app/pages/user-page/user-page';

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
      {
        path: ':id/edit',
        component: UserPage,
      },
      {
        path: 'new',
        component: UserPage,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/404',
    component: NotFoundPage,
  },
];

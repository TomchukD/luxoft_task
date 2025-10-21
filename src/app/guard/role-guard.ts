import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const role = localStorage.getItem('role');
  if (role !== undefined) {
    router.navigate(['/login']).then();
    return false;
  }

  const user = JSON.parse(role);
  if (user !== 'admin') {
    router.navigate(['/users']).then();
    return false;
  }
  return true;
};

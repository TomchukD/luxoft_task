import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  if (role) return true;

  const router = inject(Router);
  router.navigate(['/login']).then();
  return false;
};

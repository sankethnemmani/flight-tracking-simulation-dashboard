import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { UserRole } from '../enums/user-role.enum';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const allowedRoles = route.data?.['roles'] as UserRole[];

  if (authService.hasRole(allowedRoles)) {
    return true;
  }
  router.navigate(['/']);
  return false;
};

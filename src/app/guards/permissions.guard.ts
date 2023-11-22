import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { LoginService } from '@soa/login/services/login.service';

export const permissionsGuard: CanActivateFn = () => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if(!authService.getIsLoggerd()){
    router.navigate(['/']);
    return false;
  }
  return true;
};

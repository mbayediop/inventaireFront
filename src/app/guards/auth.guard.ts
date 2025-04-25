import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  if (token) {
    return true; // ✅ Accès autorisé
  } else {
    router.navigate(['/login']); // 🚫 Redirection si non connecté
    return false;
  }

};

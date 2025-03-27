import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // 1. Vérifier si l'utilisateur est connecté
    if (this.authService.isLoggedIn()) {
      return true; // Autoriser l'accès
    }

    // 2. Rediriger vers /login si non connecté
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url } // Optionnel : sauvegarder l'URL demandée
    });
    return false;
  }
}
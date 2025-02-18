import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/services/authentications/auth.service';

@Injectable({
  providedIn: 'root'
})

export class authRedirectGuard implements CanActivate{
  constructor(
    private auth: AuthService,
    private router: Router
  ){

  }

  canActivate(): boolean {
    if(this.auth.isLoggedIn()){this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
};

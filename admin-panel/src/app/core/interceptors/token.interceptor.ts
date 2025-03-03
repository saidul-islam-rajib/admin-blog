import { Injectable } from '@angular/core';
import { AuthService } from '../../core/services/authentications/auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private toast: NgToastService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if(token){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    }

    return next.handle(req).pipe(
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse){
          if(err.status == 401){
            this.toast.warning('Warning', 'Token Expired, please log again', 3000);
            this.auth.logout();
            this.router.navigate(['/login'])
          }
        }
        return throwError(() => new Error("Something went wrong!"))
      })
    );
  }
}

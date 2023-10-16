import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router:Router){}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): any{
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(cloned);
    } else {
    //  return this.router.navigateByUrl("login")
      return next.handle(request);
    }
  }
}

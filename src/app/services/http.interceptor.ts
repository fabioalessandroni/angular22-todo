import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorImpl implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const finalRequest = this.prepareRequest(request);
    return next.handle(finalRequest).pipe(tap({
      error: (err: unknown) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          if (request.url.endsWith('/user')) {
            console.log('Unauthenticated session');
          } else {
            this.authService.login();
          }
        }
      }
    }));
  }

  prepareRequest(request: HttpRequest<any>): HttpRequest<any> {
    if (request.url.endsWith('post')) {
      return request.clone();
    }
    return request.clone({
      headers: request.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
  }
}

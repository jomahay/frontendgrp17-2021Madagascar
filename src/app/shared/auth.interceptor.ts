import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.authService.isLogged)
      //Si on est connecté, on ajoute notre token à nos requêtes
      return next.handle(
        request.clone({setHeaders: { Authorization:`Bearer ${localStorage.getItem('token')}`}})
      );

    //Sinon on renvoie la requête tel quel
    return next.handle(request);
  }
}

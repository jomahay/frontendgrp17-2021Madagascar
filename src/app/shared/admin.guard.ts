import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Role} from "./Role";
import {map} from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getUser().pipe(map(utilisateur => {
        if(this.authService.isLogged){
          if(utilisateur.content.role != Role.ADMIN){
            return false;
          }else  if(utilisateur.content.role == Role.ADMIN)
          return true;
        }
        this.router.navigate(["login"]);
      return false;
       
       }))
  }
  
}

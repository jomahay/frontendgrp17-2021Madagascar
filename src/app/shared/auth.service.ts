import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpHeaders,HttpClient, HttpResponse} from "@angular/common/http";
import {Auth} from "./auth.model";
import {api} from "../../environments/environment";
import {catchError, map,tap} from "rxjs/operators";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  

  get isLogged(): boolean {
    return (localStorage.getItem('token')!= null );
  }

  constructor(private http: HttpClient) {
      

  }

 
  login(email :String ,motDePasse:String):Observable<Auth> {

    const body = {
      email: email,
      motDePasse: motDePasse
    };

        return this.http.post<Auth>(`${api}utilisateur/login`,body)
        .pipe(
          map(res => {
            return res;
          }),
          tap(a => {
            console.log("reception ");
          }),
          catchError(this.handleError<any>('catchError: login eronnée'))
        );
        
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
  getUser():Observable<any>{
      
    return this.http.get(`${api}utilisateur/moi`)
  }

 
  logOut(){
   
    localStorage.removeItem("token");
  }

  
}

import { map } from 'rxjs/operators';
import { Matiere } from './matiere.model';
import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient, HttpResponse, HttpRequest, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";

import {api} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MatieresService {
  

  constructor(private http: HttpClient) { }

 

  getMatieres():Observable<Matiere[]> {

   
    return this.http.get<Matiere[]>(`${api}matieres/tous`);
    
  }
  getMatieresPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Matiere[]>(`${api}matieres`+"?page="+page + "&limit="+limit);
  }
  addMatiere(nom:string,prof:string,file:File):Observable<any>{

    const formData = new FormData();
    formData.append('file', file);
    formData.append('nom', nom);
    formData.append('prof',prof);

    
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST',`${api}matiere`, formData, options);
    return this.http.request(req);

  }
  //update avec fichier
  updateMatiere(id:string,nom:string,prof:string,file:File):Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('nom', nom);
    formData.append('prof',prof);
    formData.append('id',id);

    
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('PUT',`${api}matiere`, formData, options);
    return this.http.request(req);
  }

  //update matiere sans fichier
  updateMatiereSansFichier(id:string,nom:string,prof:string,image:string):Observable<any> {
    const body={
      id,
      nom,
      prof,
      image
    }
    return this.http.put(`${api}matieres`,body);

  }

  getMatiere(id:String):Observable<any>{
    return this.http.get(`${api}matiere/` +id);
  }
  deleteMatiere(id:String):Observable<any> {
   
    return this.http.delete(`${api}matiere/` +id);

  }


}

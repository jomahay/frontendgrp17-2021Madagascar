import { Role } from './shared/Role';
import { interval, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  titre = 'Application d\'assignment';
  nom='';
  role='';


  

  constructor(private authService:AuthService, private router:Router,
              private assignmentsService:AssignmentsService) {
                
              }
  ngOnInit() {
                this.init();
                this.isUser();

                setTimeout(() => { this.ngOnInit() }, 1000);
              }

  init(){

    if(this.authService.isLogged!=null){
                
      this.authService.getUser().subscribe(resulat=>{
       
        this.nom=resulat.content.nom
        
        

      })
     }
  }
  get isLogged(){
    return this.authService.isLogged;
  }
  logout(){
    this.authService.logOut();

    this.router.navigate(['/login']);
   
  
  }

  isUser(){
   
    this.authService.getUser().subscribe(resulat=>{
       
      this.role=resulat.content.role

    })
   
    
  }

 get isAdmin(){
   
  if(this.role==Role.ADMIN){
    return true;
  }
   return false
    
  }
  get isProf(){
   
    if(this.role==Role.PROF){
      return true;
    }
     return false
  }
  get isEtudiant(){
   
    if(this.role==Role.ELEVE){
      return true;
    }
     return false
      
    }
}

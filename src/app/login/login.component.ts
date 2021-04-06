import { Auth } from './../shared/auth.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import { Role } from '../shared/Role';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup ;
  messageErreur="Identifiant et/ou mot de passe érroné";

  errorSnackBar:MatSnackBarRef<TextOnlySnackBar>;
  constructor(private authService:AuthService, private router:Router,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
   this.initForm();
  }
  initForm(){
    this.formGroup= new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      motDePasse: new FormControl('', [Validators.required])
    })
  }
  getErrorEmail():string{
    if(this.formGroup.controls.email.hasError('required')){
      return "Email obligatoire";
    }
    if(this.formGroup.controls.email.hasError('email')){
      return "Email invalide";
    }

    return '';
  }
  login(){

    //if(this.errorSnackBar != undefined)
      //this.errorSnackBar.dismiss();

    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value.email,this.formGroup.value.motDePasse).subscribe(resultat=>{
        if(resultat){
        
          const data=resultat.token;
          
          localStorage.setItem('token', data);

          this.authService.getUser().subscribe(resulat=>{
       
            if(resulat.content.role==Role.ADMIN || resulat.content.role==Role.PROF){
              this.router.navigate(['/assignment'],{replaceUrl:true});
            }else{
              this.router.navigate(['/add'],{replaceUrl:true});
            }
      
          });
        
          

        
     
          
        }else{
          //console.log("impossible de se connecter "+resultat.message);
          this.errorSnackBar = this.snackBar.open(this.messageErreur,"", {
            duration: 2000,
          });
        }
      })

    }
  }


   
    
   
    
  

}

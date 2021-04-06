import { Role } from './../../shared/Role';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
import { MatieresService } from '../matieres.service';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import { Utilisateur } from 'src/app/shared/utilisateur.model';

@Component({
  selector: 'app-add-matieres',
  templateUrl: './add-matieres.component.html',
  styleUrls: ['./add-matieres.component.css']
})
export class AddMatieresComponent implements OnInit {

  fileToUpload: File = null;
  
  nom:string='';
  prof:string='';
  successSnackBar:MatSnackBarRef<TextOnlySnackBar>;
  professeurs:Utilisateur[];
 
  


  constructor( private route: ActivatedRoute,
    private router: Router,private utilisateurService:UtilisateurService ,private matieresService:MatieresService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    this.getProfesseur();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

addMatiere() {
  
 this.matieresService.addMatiere(this.nom,this.prof,this.fileToUpload).subscribe(data => {
    console.log(data);
    if(data.body!=undefined){
      console.log(data.body.message);
     
      this.router.navigate(["/matiere"],{replaceUrl:true});
      this.successSnackBar = this.snackBar.open(data.body.message ,"", {
        duration: 2000,
      });
    }
    }, error => {
      console.log("errrrr");
      console.log(error.error.message);
      this.successSnackBar = this.snackBar.open(error.error.message,"", {
        duration: 2000,
      });
      this.router.navigate(["/addMatiere"]);
    });    
}

getProfesseur(){
  console.log(Role.PROF)
  this.utilisateurService.getUserByRole(Role.PROF).subscribe(professeurs=>{

    console.log(professeurs)
    this.professeurs=professeurs;
    console.log(this.professeurs)
  })
}

}

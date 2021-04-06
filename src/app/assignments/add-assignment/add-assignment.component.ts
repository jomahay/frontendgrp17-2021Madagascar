import { Role } from './../../shared/Role';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Matiere } from 'src/app/matieres/matiere.model';
import { MatieresService } from 'src/app/matieres/matieres.service';
import { AssignmentsService } from 'src/app/shared/assignments.service';

import { Utilisateur } from 'src/app/shared/utilisateur.model';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
import { Assignment } from '../assignment.model';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  nom = '';
  dateDeRendu = null;
  nomMatiere : Matiere[]
  nomFormGroup: FormGroup;
  dateFormGroup: FormGroup;
  matiereFormGroup: FormGroup;

  nomEleve : Utilisateur[];
  nomprof:  Utilisateur[];
  eleveFormGroup:FormGroup;
  successSnackBar:MatSnackBarRef<TextOnlySnackBar>;
  prof;
  role:string;
  eleveId:string;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router,private _formBuilder: FormBuilder,
              private matieresService: MatieresService,
              private utilisateurService: UtilisateurService,
              private snackBar:MatSnackBar,private authService:AuthService) {}

  //ngOnInit(): void {}
  ngOnInit() {
    this.isUser()
    this.getMatiere();
    this. getEtudiant();
    this.getProfesseur();
    console.log("Ato"+this.nomMatiere)
    this.nomFormGroup = this._formBuilder.group({
      nom: ['', Validators.required]
    });
    this.dateFormGroup = this._formBuilder.group({
      dateDeRendu: ['', Validators.required]
    });
    this.matiereFormGroup = this._formBuilder.group({
      matiere: ['', Validators.required]
    });
    this.eleveFormGroup = this._formBuilder.group({
      eleve: ['', Validators.required]
    });
    
  }
  isUser(){
   
    this.authService.getUser().subscribe(resulat=>{
       
      this.role=resulat.content.role;
      this.eleveId=resulat.content._id;

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
  getMatiere(){
    this.matieresService.getMatieres().subscribe((data)=>{
        console.log("Data Matière")
        console.log(data)
        this.nomMatiere = data;
    });
  }

  getEtudiant(){
    this.utilisateurService.getUserByRole(Role.ELEVE).subscribe((data)=>{
      console.log("Data Etudiant")
      console.log(data)
        this.nomEleve = data
    });
  }
  getProfesseur(){
    this.utilisateurService.getUserByRole(Role.PROF).subscribe((data)=>{
      console.log("Data Professeur")
      console.log(data)
        this.nomprof = data
    });
  }

  onSubmit(event) {
   if((!this.nomFormGroup.controls['nom'].value) || (! this.dateFormGroup.controls['dateDeRendu'].value) || (! this.matiereFormGroup.controls['matiere'].value) || (! this.eleveFormGroup.controls['eleve'].value) ) return;
      var splitted = this.matiereFormGroup.controls['matiere'].value.split(","); 
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = this.nomFormGroup.controls['nom'].value;
      nouvelAssignment.dateDeRendu = this.dateFormGroup.controls['dateDeRendu'].value;
      nouvelAssignment.matiere =splitted[0];
      nouvelAssignment.note = 0;
      nouvelAssignment.eleve = this.eleveFormGroup.controls['eleve'].value;
      nouvelAssignment.rendu = false;
      nouvelAssignment.remarque = "";
      nouvelAssignment.prof = splitted[1];

      console.log(this.eleveFormGroup.controls['eleve'].value +" io le id fa mipotra")
  
      this.assignmentsService.addAssignment(nouvelAssignment)
        .subscribe(reponse => {
          console.log(reponse.message);
          this.successSnackBar = this.snackBar.open(reponse.message ,"", {
            duration: 2000,
          });
          if(this.role==Role.ADMIN || this.role==Role.PROF)
          this.router.navigate(["/home"]);
          else{
            
            this.nomFormGroup.reset();
            this.dateFormGroup.reset();
            this.matiereFormGroup.reset();
            this.router.navigate(["/add"]);
          }
          
        });
  }
}

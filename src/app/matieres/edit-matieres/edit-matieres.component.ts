import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/shared/utilisateur.model';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';
import { MatieresService } from '../matieres.service';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import { Matiere } from '../matiere.model';
import { Role } from 'src/app/shared/Role';


@Component({
  selector: 'app-edit-matieres',
  templateUrl: './edit-matieres.component.html',
  styleUrls: ['./edit-matieres.component.css']
})
export class EditMatieresComponent implements OnInit {
  id: string;
  fileToUpload: File = null;
  nom:string='';
  prof:string='';
  image:string='';
  profChange:string='';
  idProfSelectionne:string='';
 

  professeurs:Utilisateur[];
  
  successSnackBar:MatSnackBarRef<TextOnlySnackBar>;

  constructor(private route: ActivatedRoute,private router: Router,private utilisateurService:UtilisateurService ,private matieresService:MatieresService,private snackBar:MatSnackBar) {

   }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.matieresService.getMatiere(this.id).subscribe(matiere=>{
        
       this.nom=matiere[0].nom;
       this.prof=matiere[0].prof.nom+" "+matiere[0].prof.prenom;
       this.image=matiere[0].image;
       this.idProfSelectionne=matiere[0].prof._id;

       
       
    });

    this.getProfesseur();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
updateMatiere() {

  console.log("id="+this.id+"image="+this.image+" prof ="+this.prof+" nom matiere ="+this.nom+
  " imageChange ="+this.fileToUpload+"profChange ="+this.profChange+ " id prof ancien="+this.idProfSelectionne)

  //fileUPLOAD et prof sont Changés 
  if(this.fileToUpload!=null && this.profChange!=''){

    console.log("fileUPLOAD et prof sont Changés ");
    this.matieresService.updateMatiere(this.id,this.nom,this.profChange,this.fileToUpload).subscribe(data=>{
      console.log(data.message+' andrana ');
      this.successSnackBar = this.snackBar.open(data.message ,"", {
        duration: 2000,
      });
    });
  }//fileUPLOAD changé mais prof pas Changés 
  else if(this.fileToUpload!=null && this.profChange==''){

    console.log("fileUPLOAD changé mais prof pas Changés ");
    this.matieresService.updateMatiere(this.id,this.nom,this.idProfSelectionne,this.fileToUpload).subscribe(data=>{
      console.log(data.message+' andrana ');
      this.successSnackBar = this.snackBar.open("modification éffectué" ,"", {
        duration: 2000,
      });
    });
  }//fileUPLOAD PAS CHANGE mais prof changé
  else if(this.fileToUpload==null && this.profChange!=''){
    console.log("fileUPLOAD PAS CHANGE mais prof changé");
    this.matieresService.updateMatiereSansFichier(this.id,this.nom,this.profChange,this.image).subscribe(data=>{
      console.log(data.message +' andrana ');
      this.successSnackBar = this.snackBar.open(data.message ,"", {
        duration: 2000,
      });
    });
  }
  //fileUPLOAD PAS CHANGE ET prof PAS changé
  else{
    console.log("fileUPLOAD PAS CHANGE ET prof PAS changé");
    this.matieresService.updateMatiereSansFichier(this.id,this.nom,this.idProfSelectionne,this.image).subscribe(data=>{
      console.log(data.message+' andrana ');
      this.successSnackBar = this.snackBar.open(data.message ,"", {
        duration: 2000,
      });
    });
  }
  this.router.navigate(["/matiere"]);
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

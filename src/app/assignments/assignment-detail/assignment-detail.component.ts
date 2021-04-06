import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Role } from 'src/app/shared/Role';
import { Assignment } from '../assignment.model';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  // passé sous forme d'attribut HTML
  assignmentTransmis: Assignment;
  arrayNumbers:number[];
  role='';
  remarque='';
  note:Number;
  successSnackBar:MatSnackBarRef<TextOnlySnackBar>;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    
    this.isUser();
    this.getAssignmentById();
    this.arrayNumbers=[0,1,2,3,4,5,6,7,8,3,10,11,12,13,14,15,16,17,18,19];
    console.log("Role:"+this.isUser());  
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: String = this.route.snapshot.params.id;
   
    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;

    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      });

    //this.assignmentTransmis = null;
  }

  onDelete() {
    if(confirm("Etes vous sur de vouloir supprimer ")) {
      this.assignmentsService
        .deleteAssignment(this.assignmentTransmis)
        .subscribe((reponse) => {
          console.log(reponse.message);

          // on cache l'affichage du détail
          this.assignmentTransmis = null;
          this.successSnackBar = this.snackBar.open(reponse.message,"", {
            duration: 2000,
          });
          // et on navigue vers la page d'accueil qui affiche la liste
          this.router.navigate(['/home']);
        });
      }
  }

  onClickEdit() {

    this.assignmentTransmis.note = this.note;
    this.assignmentTransmis.remarque = this.remarque;
    this.assignmentTransmis.rendu = true;
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
    .subscribe(reponse => {
      console.log(reponse.message);
      this.successSnackBar = this.snackBar.open(reponse.message,"", {
        duration: 2000,
      });
       // et on navigue vers la page d'accueil qui affiche la liste
       this.router.navigate(["/home"]);
    });
  }
  isUser(){
   
    this.authService.getUser().subscribe(resulat=>{
       
      this.role=resulat.content.role

    })
   
    
  }

 get isAdmin(){
  console.log("Roleee:"+this.role) 
  if(this.role==Role.ADMIN){
    return true;
  }
   return false
    
  }
  
}

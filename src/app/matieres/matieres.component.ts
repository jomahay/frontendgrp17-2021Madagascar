import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from './matiere.model';
import { MatieresService } from './matieres.service';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})


export class MatieresComponent implements OnInit {

  matieres:Matiere[];
  page: number=1;
  limit: number=8;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  successSnackBar:MatSnackBarRef<TextOnlySnackBar>;

 

  constructor( private route: ActivatedRoute,
    private router: Router,private matieresService:MatieresService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 8;

      this.getMatieres();
    });
    
  }
  getMatieres(){
   
    this.matieresService.getMatieresPagine(this.page, this.limit).subscribe(data=>{
      this.matieres = data.docs;
     
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
    });
  }
  premierePage() {
    this.router.navigate(['/matiere'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }
  pageSuivante() {
   
    this.router.navigate(['/matiere'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/matiere'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/matiere'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }

  deleteMatiere(matiere: Matiere){

    if(confirm("Etes vous sur de vouloir supprimer ")) {
      this.matieresService.deleteMatiere(matiere._id).subscribe(data=>{
        this.getMatieres();
       
        console.log(data);
        this.successSnackBar = this.snackBar.open(data.message ,"", {
          duration: 2000,
        });

        this.router.navigate(['/matiere'],{replaceUrl:true});
  
      });
    } 
  }
  


  getMatiere(matiere:Matiere){

    /*this.matieresService.getMatiere(matiere._id).subscribe(matiere=>{
      console.log(matiere);
    })*/

  }

  



}

import { Role } from './../shared/Role';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, pairwise, tap, throttleTime } from "rxjs/operators";
import { AssignmentsService } from "../shared/assignments.service";

import { Assignment } from "./assignment.model";
import { AuthService } from '../shared/auth.service';

@Component({
  selector: "app-assignments",
  templateUrl: "./assignments.component.html",
  styleUrls: ["./assignments.component.css"],
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[];
  page: number = 1;
  limit: number = 100;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  initial:boolean = true;
  tabs = ['Devoir Rendu', 'Devoir Non Rendu'];
  pageActif :number = 0;
  selected = new FormControl(0);
  role: string ;

  @ViewChild("scroller") scroller: CdkVirtualScrollViewport;

  // on injecte le service de gestion des assignments
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,private authService:AuthService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.isUser();
    console.log("AVANT AFFICHAGE");
    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams.subscribe((queryParams) => {
      console.log("Dans le subscribe des queryParams");
      this.initial = true;
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;
      this.getAssignments();
    });
    console.log("getAssignments() du service appelé");
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

  getAssignments() {
    console.log(this.initial)
    this.assignmentsService
      .getAssignmentsPagine(this.initial,this.page, this.limit)
      .subscribe((data) => {
        this.assignments = data.docs;
        console.log(this.assignments);
        //console.log(this.assignments[0].eleve[0].nom);
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

 

   

  onDeleteAssignment(event) {
    // event = l'assignment à supprimer

    //this.assignments.splice(index, 1);
    this.assignmentsService.deleteAssignment(event).subscribe((message) => {
      console.log(message);
    });
  }

  premierePage() {
    if(this.pageActif ==0){
      this.initial = true;
    }else{
      this.initial = false;
    }
    /*this.router.navigate(["/home"], {
      queryParams: {
        rendu: this.initial ,
        page: 1,
        limit: this.limit,
      },
    });*/
    this.route.queryParams.subscribe((queryParams) => {
      this.page = 1;
      this.limit = this.limit;
      this.getAssignments();
    });
  }

  

  pageSuivante() {
    if(this.pageActif ==0){
      this.initial = true;
    }else{
      this.initial = false;
    }
    /*this.router.navigate(["/home"], {
      queryParams: {
        rendu: this.initial ,
        page: this.nextPage,
        limit: this.limit,
      },
    });*/
    this.route.queryParams.subscribe((queryParams) => {
      this.page = this.nextPage;
      this.limit = this.limit;
      this.getAssignments();
    });
  }

  pagePrecedente() {
    if(this.pageActif ==0){
      this.initial = true;
    }else{
      this.initial = false;
    }
    /*this.router.navigate(["/home"], {
      queryParams: {
        rendu: this.initial ,
        page: this.prevPage,
        limit: this.limit,
      },replaceUrl:true,
    });*/
    this.route.queryParams.subscribe((queryParams) => {
      this.page = this.prevPage;
      this.limit = this.limit;
      this.getAssignments();
    });
  }

  dernierePage() {
    if(this.pageActif ==0){
      this.initial = true;
    }else{
      this.initial = false;
    }
   /* this.router.navigate(["/home"], {
      skipLocationChange: true ,
      queryParams: {
        rendu:this.initial,
        page: this.totalPages,
        limit: this.limit,
      },
    });*/
    this.route.queryParams.subscribe((queryParams) => {
      this.page = this.totalPages;
      this.limit = this.limit;
      this.getAssignments();
    });
    
  }
  tabClick(tab) {
    if(tab.index == 0){
      this.pageActif = 0;
      this.initial = true;
      this.route.queryParams.subscribe((queryParams) => {
        console.log("Dans le subscribe des queryParams");
       
        this.page = +queryParams.page || 1;
        this.limit = +queryParams.limit || 10;
        this.getAssignments();
      });
    }
    else{
      this.pageActif = 1;
      this.initial = false;
      this.route.queryParams.subscribe((queryParams) => {
        console.log("Dans le subscribe des queryParams");
       
        this.page = +queryParams.page || 1;
        this.limit = +queryParams.limit || 10;
        this.getAssignments();
      });
    }
  }
}

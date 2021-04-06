import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { AssignmentsComponent } from './assignments/assignments.component';
import {MatTableModule} from '@angular/material/table'; 
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssigmentComponent } from './assignments/edit-assigment/edit-assigment.component';
import { AuthGuard } from './shared/auth.guard';
import { AdminGuard } from './shared/admin.guard';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {AuthInterceptor} from "./shared/auth.interceptor";
import { MatieresComponent } from './matieres/matieres.component';
import { EditMatieresComponent } from './matieres/edit-matieres/edit-matieres.component';
import { AddMatieresComponent } from './matieres/add-matieres/add-matieres.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { AddUtilisateursComponent } from './utilisateurs/add-utilisateurs/add-utilisateurs.component';
import { EditUtiilsateursComponent } from './utilisateurs/edit-utiilsateurs/edit-utiilsateurs.component';
import { MatTabsModule} from '@angular/material/tabs'
import {MatStepperModule} from '@angular/material/stepper'

const routes:Routes = [

 //Assignment
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" à la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path:"assignment",
    component:AssignmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    // idem avec  http://localhost:4200/home
    path:"home",
    component:AssignmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"add",
    component:AddAssignmentComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path:"assignments/:id",
    component:AssignmentDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"assignment/:id/edit",
    component:EditAssigmentComponent,
    canActivate : [AuthGuard]
  },
  //login
  {
    path:"login",
    component:LoginComponent
  },
  //Matieres
  {
    path:"matiere",
    component:MatieresComponent,
    canActivate:[AdminGuard]
  },
  {
    path:"addMatiere",
    component:AddMatieresComponent,
    canActivate: [AdminGuard]
  },
  {
    path:"matiere/:id/edit",
    component:EditMatieresComponent,
    canActivate: [AdminGuard]
  },
  //Utilisateur
  {
    path:"utilisateur",
    component:UtilisateursComponent,
    canActivate: [AdminGuard]
  },
  {
    path:"addUtilisateur",
    component:AddUtilisateursComponent,
    canActivate: [AdminGuard]
  },
  {
    path:"utilisateur/:id/edit",
    component:EditUtiilsateursComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssigmentComponent,
    LoginComponent,
    MatieresComponent,
    EditMatieresComponent,
    AddMatieresComponent,
    UtilisateursComponent,
    AddUtilisateursComponent,
    EditUtiilsateursComponent,
    
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
  MatToolbarModule,
  CommonModule,
  MatTableModule,
  MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
     ReactiveFormsModule,
     MatStepperModule,MatTabsModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule, MatCheckboxModule,
    MatSlideToggleModule,
    FlexLayoutModule ,
    RouterModule.forRoot(routes), HttpClientModule, ScrollingModule, LayoutModule, MatSidenavModule
  ],
  providers: [ 
    //Ajoute un intercepteur pour le token dans les appels api
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

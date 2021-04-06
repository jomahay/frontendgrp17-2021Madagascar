import { Matiere } from "../matieres/matiere.model";
import { Utilisateur } from "../shared/utilisateur.model";

export class Assignment {
  _id?:string;
  id:number;
  nom:string;
  dateDeRendu:Date;
  note:Number;
  rendu:boolean;
  matiere:Matiere;
  eleve:Utilisateur;
  remarque:String;
  prof:Utilisateur;
}

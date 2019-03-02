import { Component, OnInit } from '@angular/core';
import { DataService} from '../services/app.services.data';


@Component({
  
  selector: 'app-visites',
  templateUrl: './visites.component.html',
  styleUrls: ['./visites.component.css']
})
export class VisitesComponent {
  titre : string; 
  lesRapports : Array<any>;
  dateVisite : Date;

  nomMedecin : string;
  lesMedecins : Array<any>; 
  medecin : any;
  gestionMajRapport : boolean = false;
  gestionAjoutRapport : boolean = false;
  //chargervisites
  afficherRapport : boolean = false;
  rapport : any;
  //bouton valider rapport maj
  messageMAJ : string ="";
  typeMessage : string ="";

  //initialise les champs lors de l'ajout
  motif : string;
  bilan : string;
  dateNouveauRapport :Date;
  nomMedicament : string;
  qteSelect :number;
  messageEnregistrement : string ="";
  //choisirMedicaments
  lesMedicaments : Array<any>; 
  medicamentSelect : any;
  
  //Pour les quantites
  qtes : Array<number> = [1,2,3,4,5];
  medicamentsSelect : Array<any> = new Array();
  // compléter en ajoutant les champs présent dans le fichier HTML
  constructor(private dataService : DataService){

  }
  modifierRapport(): void{
    // cette méthode initialise les champs
    this.gestionAjoutRapport = false;
    this.gestionMajRapport = true;
}
  chargerMedecins(){
    // Compléter en appelant la méthode chargerMedecins de DataService en s'inspirant de la partie 3
    this.dataService.chargerMedecins(this.nomMedecin)
                                  .subscribe( 
                                      (data)=>{this.lesMedecins = data;
                                         }
                                      ,(error)=>{}
                                              );
  }
  selectionnerMedecin(med) : void{
        // Compléter en s'inspirant de la partie 3
        this.medecin = med;
        this.nomMedecin = med.nom + " " + med.prenom + "; dep : " + med.departement;
        this.lesMedecins = null;
  }
  
  chargerVisites() : void{
      // cette méthode appelle la méthode chargerRapportsAunedate de DataService
      this.titre = "Médecins visité(s) ce jour :";
     console.log(this.dataService.visiteur[0].id);
    this.dataService.chargerRapportsAuneDate(this.dataService.visiteur[0].id, this.dateVisite)
                               .subscribe( 
                                   (data)=>{this.lesRapports = data;
                                   console.log(this.lesRapports);
                                      }
                                   ,(error)=>{}
                                          );
} 

  
  selectionner(rapport){
       // compléter pour faire apparaître le rapport
       this.rapport = rapport;
       this.afficherRapport = true;
  }
  valider(): void{
      // appelle majRapport de DataService 
      // dans le cas favorable, affiche un message de succès avec des classes CSS "alert alert-success"
      // et dans le cas défavorable, affiche un message avec des classes CSS "alert alert-danger"
      console.log(this.rapport);
       this.dataService.majRapport(this.rapport.idRapport,this.rapport.motif,this.rapport.bilan)
                                  .subscribe( 
                                      (data)=>{ this.typeMessage ="alert alert-success";
                                                this.messageMAJ= "Mise à jour effectuée";
                                         }
                                      ,(error)=>{  this.typeMessage ="alert alert-danger";
                                        this.messageMAJ =  "Merci de réessayer plus tard";
   });
}
   initNouveauRapport(){
       this.nomMedecin ="";
       // compléter initialise les champs lorsque l'on ajoute un nouveau rapport
       this.bilan="";
       this.motif="";
       this.dateNouveauRapport = null;
       this.nomMedicament = "";
       this.qteSelect = 1;
       this.typeMessage="";
       this.messageEnregistrement ="";
   }
   ajouterRapport(): void{
     this.initNouveauRapport();
      this.gestionAjoutRapport = true;
      this.gestionMajRapport = false;
   }
   chargerMedicaments(){
     // appelle la méthode chargerMedicaments du DataService
     this.dataService.chargerMedicaments(this.nomMedicament)
          .subscribe( 
                     (data)=>{this.lesMedicaments 
                       = data;
                       console.log(data);
                                         }
                                      ,(error)=>{}
                                             );
   }
   choisirMedicament(medicament : any){
      // permet d'afficher le médicament
      this.medicamentSelect = medicament;
      console.log(this.medicamentSelect);
      this.nomMedicament = medicament.nomCommercial;    
      this.lesMedicaments = null;
   }
   ajouter(): void{
      console.log(this.medicamentSelect);
      this.medicamentsSelect.push({id : this.medicamentSelect.id, nom : 
      this.medicamentSelect.nomCommercial, qte : this.qteSelect});
      this.nomMedicament ="";
   }
   retirer() : void{
      //this.medicamentsSelect.pop();
      this.medicamentsSelect.pop();
   }
   enregistrer(): void{
      // appelle la méthode enregistrerRapport du dataService
      // dans le cas favorable, affiche un message de succès avec des classes CSS "alert alert-success"
      // et dans le cas défavorable, affiche un message avec des classes CSS "alert alert-danger"
      console.log(this.dateNouveauRapport);
      console.log(this.medicamentsSelect);
      this.dataService.enregistrerRapport(this.dataService.visiteur[0].id,this.medecin.id,this.motif,this.dateNouveauRapport, this.bilan,this.medicamentsSelect )
               .subscribe( 
                     (data)=>{ this.typeMessage ="alert alert-success";
                               this.messageEnregistrement= "Enregistrement effectué";}
                              ,(error)=>{
                                this.typeMessage ="alert alert-danger"
                                this.messageEnregistrement= "Merci de réessayer plus tard";}
                        );
   }

   }
  


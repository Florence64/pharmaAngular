import { Component, OnInit } from '@angular/core';
import { DataService} from '../services/app.services.data';
import { Medecin } from '../models/medecin.model';

@Component({
  selector: 'my-medecins',
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.css']
})
export class MedecinsComponent implements OnInit {
  medecinnouv: Medecin={
    id: null,
nom:null,
prenom:null,
adresse:null,
tel:null,
specialitecomplementaire:null,
departement:null,
  };
  legende : string = "Rechercher le médecin";
  estCacheMenu : Boolean = true;
  nomMedecin : string;
  //variable pour mehode selectionner 
  medecin : any;
  lesMedecins : Array<any>;
//evolution3 q2.2
afficherRapports : boolean = false;
lesRapports : Array<any>;
//evoluton q3.2
afficherMedecin : boolean = false;
afficherMessage : boolean = false;
lblMessage="";
majmedecin: Medecin;

  constructor( private dataService : DataService){}
   charger() : void{
        this.dataService.chargerMedecins(this.nomMedecin)
                                  .subscribe( 
                                      (data)=>{this.lesMedecins = data;
                                         }
                                      ,(error)=>{}
                                              );
   }
   selectionner(med) : void{
    this.medecin = med;
    this.nomMedecin = med.nom + " " + med.prenom + "; dep : " + med.departement;
    this.lesMedecins = null;
    this.legende ="";
    this.estCacheMenu = false;       
}
derniersRapports() : void{
  this.afficherRapports = true;
  //rajouter pour la question 3.2
  this.afficherMedecin = false;
  this.dataService.chargerRapports(this.medecin.id)
                            .subscribe(                             
                                (data)=>{this.lesRapports = data;
                                  console.log(data);
                                   }
                                ,(error)=>{}
                                        );
}
majMedecin() : void{
  this.afficherRapports = false;
  this.afficherMedecin = true;
  this.afficherMessage = false;
 
}

valider(): void{
  this.afficherMessage = true;
 // console.log(this.medecin.id,this.medecin.adresse,this.medecin.tel,this.medecin.specialitecomplementaire);
   this.dataService.majMedecin(this.medecin.id,this.medecin.adresse,this.medecin.tel,this.medecin.specialitecomplementaire) 
                             .subscribe( 
                                 (data)=>{ this.lblMessage= "Enregistrement effectué";
                                 console.log(data);
                                    }
                                 ,(error)=>{this.lblMessage= "Merci de réessayer plus tard";}
                                         );
}

  ngOnInit() {
  }

}

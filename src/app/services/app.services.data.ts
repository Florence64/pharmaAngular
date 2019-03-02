import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';

@Injectable()
export class DataService {
    private  urlDomaine :  string = "http://slamsjp.alwaysdata.net/restPharma";
    visiteur : any;
    constructor(private http: HttpClient) {}
    
    public connexion( loginIn : string, mdpIn : string ) : Observable<string[]> {
     console.log(loginIn+" "+mdpIn);
        let url :string = this.urlDomaine + "/connexion/selectunVisiteur2.php?login=" + loginIn + "&mdp=" + mdpIn;
        console.log(url);
        let req = this.http
                    .get<string[]>(url);
                    
        return req;
    }

    public chargerMedecins(nomMedecin : string) : Observable<string[]>{
        let url : string =  this.urlDomaine + "/medecins/selectMedecinsNom.php?nom=" + nomMedecin;
        let req = this.http
                     .get<string[]>(url);
        return req;

    }

    public chargerRapports(idMedecin : Number ){
        let url : string =  this.urlDomaine + "/medecins/selectRapportsIdM.php?idM=" + idMedecin;
        let req = this.http
                .get<string[]>(url);
               
         return req;
     }
 
     public majMedecin(id : string ,adresse : string, tel :string, spe : string){
        let url : string =  this.urlDomaine + "/medecins/majMedecin.php?idMedecin=" + id + "&adresse=";
            url += adresse + "&tel=" + tel +"&specialite=" + spe;
           
        let req = this.http.get(url);
      
        
     return req;
}
public chargerRapportsAuneDate(idVisiteur:string, date : Date ): Observable<string[]>{
    console.log("charger"+idVisiteur+" "+date);
    let url : string =  this.urlDomaine + "/rapports/getLesRapportsAUneDate.php?idVisiteur=" + idVisiteur + "&date=" + date;
    let req = this.http
            .get<string[]>(url)
            
    return req;    

}

public majRapport(idRapport : string, motif : string, bilan : string){
    let url : string =  this.urlDomaine + "/rapports/majRapport.php?idRapport=" + idRapport + "&motif=";
          url += motif + "&bilan=" + bilan;
      let req = this.http
                 .get(url)
   return req;
}

public chargerMedicaments(nom: string){
    let url : string =  this.urlDomaine + "/medicaments/getMedicamentsNom.php?nom=" + nom;
let req = this.http
            .get<string[]>(url);
return req;
}

public enregistrerRapport(idVisiteur : string, idMedecin : string, motif : string,date : Date, bilan : string,lesMedicaments : Array<any> ){
    let url : string =  this.urlDomaine + "/rapports/ajouterRapport.php?idVisiteur=" + idVisiteur + "&motif=";
        url += motif + "&bilan=" + bilan + "&idMedecin=" + idMedecin +"&date="+ date;
        console.log(url);
        lesMedicaments.forEach((med)=>{url+="&medicaments["+med.id+"]="+ med.qte;});
            let req = this.http
                     .get(url);
                     
       return req;

}
}
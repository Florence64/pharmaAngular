import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService} from '../services/app.services.data';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  

  ngOnInit() {
    
  }
  titre : string ="Connexion";
  lblLogin : string ="Login";
  lblMdp : string ="Mot de passe";
  login : string ;
  mdp : string;
  estCache : boolean = true;
  lblMessage : string = "";
  visiteur : any;
  constructor(private router : Router,private dataService : DataService){}

  valider():void{
   
    console.log("bonjour");
    console.log(this.login+" "+this.mdp);
   this.dataService.connexion(this.login,this.mdp)
   
                          .subscribe( 
                              (data)=>{this.visiteur = data;
                                
                                this.dataService.visiteur = data;
                                console.log( this.dataService.visiteur);
                                console.log( this.dataService.visiteur[0].id);
                                this.estCache = true;
                                 this.router.navigate(['accueil']);}
                              ,(error)=>{this.estCache = false;
                                       this.lblMessage = "erreur";}
                                      );
}  
}


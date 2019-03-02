import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MedecinsComponent } from './medecins/medecins.component';
import { VisitesComponent } from './visites/visites.component';
import { HttpClientModule } from "@angular/common/http";
import { DataService } from './services/app.services.data';




const appRoutes: Routes = [
  { path: '', component: ConnexionComponent },
  { path: 'medecins', component: MedecinsComponent },
  { path: 'visites', component: VisitesComponent },
  { path: 'accueil',  component: NavbarComponent  }
];

@NgModule({
  declarations: [
    AppComponent,
  
    ConnexionComponent,
    NavbarComponent,
    MedecinsComponent,
    VisitesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
providers:[DataService],
  bootstrap: [AppComponent],
   
})
export class AppModule { }

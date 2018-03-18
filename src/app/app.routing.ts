import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


//Componentes
import {AppComponent} from './app.component';
import { HomeComponent } from './components/home/home.component';
import { InformacionComponent } from './components/info/infomacion.component';
import { EjecucionComponent } from './components/execution/ejecucion.component';
import { ErrorComponent } from './components/error/error.component';




const appRoutes : Routes = [

  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'info', component: InformacionComponent},
  {path:'ejecucion', component: EjecucionComponent},
  {path:'**', component: ErrorComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

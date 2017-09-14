import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {HomeComponent} from './components/home.component';
import {InformacionComponent} from './components/infomacion.component';
import {EjecucionComponent} from "./components/ejecucion.component";
import {ErrorComponent} from './components/error.component';

//Rutas
import {routing, appRoutingProviders} from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InformacionComponent,
    EjecucionComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

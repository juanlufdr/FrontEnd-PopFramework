import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';


//Rutas
import {routing, appRoutingProviders} from './app.routing';
import { FractionPipe } from './pipes/fraction.pipe';
import { HomeComponent } from './components/home/home.component';
import { InformacionComponent } from './components/info/infomacion.component';
import { EjecucionComponent } from './components/execution/ejecucion.component';
import { ErrorComponent } from './components/error/error.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    FractionPipe,
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
    Ng2SmartTableModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

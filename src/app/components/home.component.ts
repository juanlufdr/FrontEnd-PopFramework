import { Component } from '@angular/core';
@Component({
  selector: 'home',
  templateUrl: '../views/home.component.html'
})

export class HomeComponent{
  public titulo:string;

  constructor(){
    this.titulo = "¿Qué es POP Framework?";
  }

  ngOnInit(){
    console.log("Cargado home.component");
  }

}

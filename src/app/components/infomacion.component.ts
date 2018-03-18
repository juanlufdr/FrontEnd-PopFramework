import { Component } from '@angular/core';
@Component({
  selector: 'info',
  templateUrl: '../views/informacion.component.html'
})

export class InformacionComponent{
  public titulo:string;

  constructor(){
    this.titulo = "What is POP Framework?";
  }

  ngOnInit(){
    console.log("Cargado informacion.component");
  }

}

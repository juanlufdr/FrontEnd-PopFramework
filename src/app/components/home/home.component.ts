import { Component } from '@angular/core';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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

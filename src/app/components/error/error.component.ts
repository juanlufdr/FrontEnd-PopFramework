import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})

export class ErrorComponent implements OnInit {
  public error: string;

  constructor() {
    this.error = 'Se ha producido un error. La url no es correcta. Compruebela';
  }

  ngOnInit() {
    console.log('Cargado error.component');
  }

}

import { Component, OnInit } from '@angular/core';
import { PeticionesService } from './services/servicios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [PeticionesService]
})

export class AppComponent implements OnInit {

  constructor(
    private service: PeticionesService
  ) {

  }
  ngOnInit() {
    //this.service.connect();
  }
}




//prueba commit

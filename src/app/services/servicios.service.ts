import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()

export class PeticionesService{

  public url:string;

  constructor(private _http : Http){
    this.url = "https://jsonplaceholder.typicode.com/posts";
  }

  getReferecences(){
    return this._http.request("../../assets/json/references.json")
      .map(respuestaOK => respuestaOK.json());
  }

  getCharacteristics(){
    return this._http.request("../../assets/json/characteristics.json")
      .map(respuestaOK => respuestaOK.json());
  }
}

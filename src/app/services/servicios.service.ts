import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";


@Injectable()
export class PeticionesService{


  constructor(private _http : Http){}

  getReferecences(){
    return this._http.request("../../assets/json/references.json")
      .map(respuestaOK => respuestaOK.json());
  }

  getCharacteristics(){
    return this._http.request("../../assets/json/characteristics.json")
      .map(respuestaOK => respuestaOK.json());
  }

  getReferecencesRemote():Observable<any>{


    return this._http.get("http://localhost:8080/firstMatrix")
    .map(res => res.json());
  }

  getCharacteristicsRemote(){

      return this._http.get("http://localhost:8080/secondMatrix")
      .map(res => res.json());

  }

  procesar(){
    
          return this._http.get("http://localhost:8080/procesar")
          .map(res => res.json());
    
      }
}

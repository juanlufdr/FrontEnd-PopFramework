import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class PeticionesService {


  constructor(private _http: Http) { }

  connect() {

    return this._http.get('http://localhost:8080/getConnection').map(
      res => (res.json()));

  }

  // getReferecences() {
  //   return this._http.request("../../assets/json/references.json")
  //     .map(respuestaOK => respuestaOK.json());
  // }

  // getCharacteristics() {
  //   return this._http.request("../../assets/json/characteristics.json")
  //     .map(respuestaOK => respuestaOK.json());
  // }

  getReferenceAndCharacteristics() {
    return Observable.forkJoin(
      this.getReferecencesRemote(),
      this.getCharacteristicsRemote()
    );
    // .map(res => this.join(res[0], res[1]));
  }

  join(references, characteristics) {
    return {
      'references': references.json(),
      'characteristics': characteristics.json()
    };
  }

  getReferecencesRemote(): Observable<any> {


    return this._http.get('http://localhost:8080/firstMatrix')
      .map(res => res.json());
  }

  getCharacteristicsRemote() {

    return this._http.get('http://localhost:8080/secondMatrix')
      .map(res => res.json());

  }

  procesar() {

    return this._http.get('http://localhost:8080/procesar')
      .map(res => res.json());

  }
}

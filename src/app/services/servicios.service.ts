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

  getReferenceAndCharacteristics() {
    return Observable.forkJoin(
      this.getReferecencesRemote(),
      this.getCharacteristicsRemote()
    );
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

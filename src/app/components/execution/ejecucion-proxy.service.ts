import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class EjecucionProxyService {

    constructor(private http: Http) { }

    getReferecences(): Observable< Response > {
        return this.http.get('http://localhost:8080/firstMatrix');
    }

    getCharacteristics(): Observable < Response > {
        return this.http.get('http://localhost:8080/secondMatrix');
    }
}

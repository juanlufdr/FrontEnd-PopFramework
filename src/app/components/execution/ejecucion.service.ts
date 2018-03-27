import { DEFAULT_VALUES_PARAMETERS } from './ejecucion.const';
import { EjecucionProxyService } from './ejecucion-proxy.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';


@Injectable()

export class EjecucionService {

    private efficiency;
    private size_comunity;
    private involvement;
    private reputation;
    private maturity;

    constructor(private proxy: EjecucionProxyService) {
        this.efficiency = DEFAULT_VALUES_PARAMETERS;

        this.size_comunity = DEFAULT_VALUES_PARAMETERS;

        this.involvement = DEFAULT_VALUES_PARAMETERS;

        this.reputation = DEFAULT_VALUES_PARAMETERS;

        this.maturity = DEFAULT_VALUES_PARAMETERS;
    }

    getReferences(): Observable<any> {
        return this.proxy.getReferecences().map(
            (response) => {
                // mapear response a interface
            }
        );
    }

    getCharacteristics(): Observable<any> {
        return this.proxy.getCharacteristics().map(
            (response) => {
                // mapear respuesta a interface
            }
        );
    }

}

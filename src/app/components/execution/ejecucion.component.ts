import { PeticionesService } from './../../services/servicios.service';
import { DEFAULT_VALUES_PARAMETERS } from './ejecucion.const';
import { Component, OnInit } from '@angular/core';
import { EjecucionService } from '../../services/ejecucion/ejecucion.service';
import { Observable } from 'rxjs/Observable';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@Component({
  selector: 'app-ejecucion',
  templateUrl: './ejecucion.component.html',
  styleUrls: ['./ejecucion.component.scss'],
  providers: [PeticionesService, EjecucionService]
})

export class EjecucionComponent implements OnInit {
  public titulo: string;
  public metodo: string;
  public references;
  public characteristics;
  public matrix: Array<any>;
  public normalizeMatrix: Array<any>;
  public finalNormalizeMatrix: Array<any>;
  public reciprocalMatrix: Array<any>;
  public criterios: Array<string>;
  public selectOptions: Array<number>;
  public finalNormalizeArray: Array<any>;
  public vectorPromedio: Array<any>;
  public consistencia;
  public resultadoObject;
  public mostrarResultados;
  public cargando;
  public mostrarBotonCalculo;

  constructor(
    private _peticionesService: PeticionesService,
    private ejecucionService: EjecucionService
  ) {
    this.titulo = 'AHP comparison criterion';
    this.metodo = '';
    this.matrix = new Array();
    this.normalizeMatrix = new Array();
    this.finalNormalizeMatrix = new Array();
    this.reciprocalMatrix = new Array();
    this.selectOptions = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0.5, 0.33, 0.25, 0.20, 0.17, 0.14, 0.13, 0.11];
    this.criterios = ['Eficiencia', 'Tamaño de la Comunidad', 'Involucramiento', 'Reputacion', 'Madurez'];
    this.finalNormalizeArray = new Array();
    this.vectorPromedio = new Array();
    this.consistencia = 0;
    this.resultadoObject = new Array();
    this.mostrarResultados = false;
    this.cargando = false;
    this.mostrarBotonCalculo = false;

  }


  ngOnInit() {
    console.log('Cargado ejecucion.component.ts');
    this._peticionesService.connect().subscribe(

      result => {
        if (result == true) {
          console.log('Conectado a base de datos');
        }else {
          console.log('Error al conectar a base de datos');
        }
      },
      error => {
        console.log("error en la petición");
      }
    );


  }

  selectMetodo(metodo) {
    this.metodo = metodo;
    this.cargando = true;
    this.mostrarBotonCalculo = false;
    this.mostrarResultados = false;
    this.calculateMeasures();
  }

  calculateMeasures() {
    console.log('Entra en calculo remoto');
    this.remoteJsonProcesar();

  }

  remoteJsonProcesar() {

    if (this.metodo === 'rapido') {
      this.callRemoteService();
    } else {
      this._peticionesService.procesar().subscribe(
        result => {
          if (result === true) {
            this.callRemoteService();
          } else {
            console.log('Error en procesar');
          }
        },
        error => {
          let errorMsg = error;
          if (errorMsg !== null) {
            console.log(errorMsg);
            alert('Error en el procesamiento');
          }
        }

      );
    }

  }

  callRemoteService() {

    this._peticionesService.getReferenceAndCharacteristics().subscribe(
      (response) => {
        this.references = response[0];
        this.characteristics = response[1];
        console.log(response);
        this.matrix = this.ejecucionService.calculateMatrix(this.characteristics, this.references);
        this.normalizeMatrix = this.ejecucionService.normalizeMatrixFunction(this.matrix);
        this.reciprocalMatrix = this.ejecucionService.initReciprocalMatrix();
        this.consistencia = 0;
        console.log(this.cargando);
        this.cargando = false;
        console.log(this.cargando);
        let object = this.ejecucionService.calculoAHP(this.reciprocalMatrix, this.vectorPromedio, this.consistencia);
        this.vectorPromedio = object.vector_promedio;
        this.consistencia = object.consistencia;
        this.mostrarBotonCalculo = true;
      }
    );

  }

  changeValue(index1, index2, $event) {
    this.reciprocalMatrix[index2][index1].value = this.evaluarValor(parseFloat($event));
    this.reciprocalMatrix[index1][index2].value = parseFloat(this.reciprocalMatrix[index1][index2].value);
    let object = this.ejecucionService.calculoAHP(this.reciprocalMatrix, this.vectorPromedio, this.consistencia);
    this.vectorPromedio = object.vector_promedio;
    this.consistencia = object.consistencia;
  }


  evaluarValor(valor) {
    switch (valor) {
      case 9:
        return 0.11;
      case 8:
        return 0.13;
      case 7:
        return 0.14;
      case 6:
        return 0.17;
      case 5:
        return 0.2;
      case 4:
        return 0.25;
      case 3:
        return 0.33;
      case 2:
        return 0.5;
      case 1:
        return 1;
      case 0.5:
        return 2;
      case 0.33:
        return 3;
      case 0.25:
        return 4;
      case 0.2:
        return 5;
      case 0.17:
        return 6;
      case 0.14:
        return 7;
      case 0.13:
        return 8;
      case 0.11:
        return 9;
    }
  }

  calcularResultados() {

    let indicatorPriorityVector = new Array();
    for (let i = 0; i < this.normalizeMatrix.length; i++) {
      let indicatorPVAux = new Array();
      for (let j = 0; j < this.normalizeMatrix[i].length; j++) {
        let auxValue = this.normalizeMatrix[i][j] * this.vectorPromedio[i];
        indicatorPVAux.push(auxValue);
      }
      indicatorPriorityVector.push(indicatorPVAux);
    }

    let resultados = new Array();
    this.resultadoObject = new Array();

    for (let i = 0; i < 14; i++) {
      let resultadoParcial = 0;
      for (let j = 0; j < indicatorPriorityVector.length; j++) {
        resultadoParcial = resultadoParcial + indicatorPriorityVector[j][i];
      }
      resultados.push(resultadoParcial);
    }

    for (let i = 0; i < resultados.length; i++) {
      let object = null;
      switch (i) {
        case 0:
          object = {
            'id': 'Administration & Finances',
            'value': resultados[0]
          };
          this.resultadoObject.push(object);
          break;
        case 1:
          object = {
            'id': 'Business',
            'value': resultados[1]
          };
          this.resultadoObject.push(object);
          break;
        case 2:
          object = {
            'id': 'Demographics',
            'value': resultados[2]
          };
          this.resultadoObject.push(object);
          break;
        case 3:
          object = {
            'id': 'Education',
            'value': resultados[3]
          };
          this.resultadoObject.push(object);
          break;
        case 4:
          object = {
            'id': 'Ethics & Democracy',
            'value': resultados[4]
          };
          this.resultadoObject.push(object);
          break;
        case 5:
          object = {
            'id': 'Geospatial',
            'value': resultados[5]
          };
          this.resultadoObject.push(object);
          break;
        case 6:
          object = {
            'id': 'Health',
            'value': resultados[6]
          };
          this.resultadoObject.push(object);
          break;
        case 7:
          object = {
            'id': 'Recreation & Culture',
            'value': resultados[7]
          };
          this.resultadoObject.push(object);
          break;

        case 8:
          object = {
            'id': 'Safety',
            'value': resultados[8]
          };
          this.resultadoObject.push(object);
          break;

        case 9:
          object = {
            'id': 'Services',
            'value': resultados[9]
          };
          this.resultadoObject.push(object);
          break;

        case 10:
          object = {
            'id': 'Sustainability',
            'value': resultados[10]
          };
          this.resultadoObject.push(object);
          break;



        case 11:
          object = {
            'id': 'Transport & Infrastructure',
            'value': resultados[11]
          };
          this.resultadoObject.push(object);
          break;

        case 12:
          object = {
            'id': 'Urban Planning & Housing',
            'value': resultados[12]
          };
          this.resultadoObject.push(object);
          break;

        case 13:
          object = {
            'id': 'Welfare',
            'value': resultados[13]
          };
          this.resultadoObject.push(object);
          break;
      }
    }

    this.resultadoObject.sort(function (a, b) {
      return (b.value - a.value);
    });

    this.mostrarResultados = true;

  }

}


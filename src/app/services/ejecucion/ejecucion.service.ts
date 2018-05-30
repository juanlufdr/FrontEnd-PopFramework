import { Injectable } from '@angular/core';
import { DEFAULT_VALUES_PARAMETERS } from '../../components/execution/ejecucion.const';

@Injectable()
export class EjecucionService {

  constructor() { }

  public calculateMatrix(characteristics, references): Array<any> {

    let matrix = new Array<any>();
    let keys = Object.keys(characteristics.contributors);

    let efficiency, size_comunity, involvement, reputation, maturity;

    efficiency = {
      'administration_finances': 0,
      'business': 0,
      'demographics': 0,
      'education': 0,
      'ethics_democracy': 0,
      'geospatial': 0,
      'health': 0,
      'recreation_culture': 0,
      'safety': 0,
      'services': 0,
      'sustainability': 0,
      'transport_infrastructure': 0,
      'urban_planning_housing': 0,
      'welfare': 0
    };

    for (let i = 0; i < keys.length; i++) {
      efficiency[keys[i]] = references.datasets_references_github[keys[i]] / references.datasets_references_ornot_github[keys[i]];
    }

    matrix.push(efficiency);

    size_comunity = {
      'administration_finances': 0,
      'business': 0,
      'demographics': 0,
      'education': 0,
      'ethics_democracy': 0,
      'geospatial': 0,
      'health': 0,
      'recreation_culture': 0,
      'safety': 0,
      'services': 0,
      'sustainability': 0,
      'transport_infrastructure': 0,
      'urban_planning_housing': 0,
      'welfare': 0
    };

    for (let i = 0; i < keys.length; i++) {
      size_comunity[keys[i]] = characteristics.contributors[keys[i]] /
        references.distinct_repositories_referencing_category[keys[i]];
    }

    matrix.push(size_comunity);

    involvement = {
      'administration_finances': 0,
      'business': 0,
      'demographics': 0,
      'education': 0,
      'ethics_democracy': 0,
      'geospatial': 0,
      'health': 0,
      'recreation_culture': 0,
      'safety': 0,
      'services': 0,
      'sustainability': 0,
      'transport_infrastructure': 0,
      'urban_planning_housing': 0,
      'welfare': 0
    };


    for (let i = 0; i < keys.length; i++) {
      involvement[keys[i]] = characteristics.contributions[keys[i]] / references.distinct_repositories_referencing_category[keys[i]];
    }

    matrix.push(involvement);

    reputation = {
      'administration_finances': 0,
      'business': 0,
      'demographics': 0,
      'education': 0,
      'ethics_democracy': 0,
      'geospatial': 0,
      'health': 0,
      'recreation_culture': 0,
      'safety': 0,
      'services': 0,
      'sustainability': 0,
      'transport_infrastructure': 0,
      'urban_planning_housing': 0,
      'welfare': 0
    };

    for (let i = 0; i < keys.length; i++) {
      reputation[keys[i]] = characteristics.subscribers[keys[i]] / references.distinct_repositories_referencing_category[keys[i]];
    }

    matrix.push(reputation);

    maturity = {
      'administration_finances': 0,
      'business': 0,
      'demographics': 0,
      'education': 0,
      'ethics_democracy': 0,
      'geospatial': 0,
      'health': 0,
      'recreation_culture': 0,
      'safety': 0,
      'services': 0,
      'sustainability': 0,
      'transport_infrastructure': 0,
      'urban_planning_housing': 0,
      'welfare': 0
    };


    for (let i = 0; i < keys.length; i++) {
      maturity[keys[i]] = characteristics.maturity[keys[i]] / references.distinct_repositories_referencing_category[keys[i]];
    }

    matrix.push(maturity);

    return matrix;

    // this.normalizeMatrixFunction();

  }

  public normalizeMatrixFunction(matrix): Array<any> {
    let normalizeMatrix = matrix;

    let keys = Object.keys(matrix[0]);

    for (let i = 0; i < matrix.length; i++) {
      let bestValue = this.buscarMayor(matrix[i]);
      for (let j = 0; j < keys.length; j++) {
        normalizeMatrix[i][keys[j]] = matrix[i][keys[j]] / bestValue;
      }

    }

    let array = new Array();

    for (let i = 0; i < normalizeMatrix.length; i++) {
      let data = new Array();
      for (let j = 0; j < keys.length; j++) {

        data.push(normalizeMatrix[i][keys[j]]);
      }

      array.push(data);
    }

    normalizeMatrix = array;

    return normalizeMatrix;

    // this.initReciprocalMatrix();
  }

  private buscarMayor(array) {
    let mayor = 0;

    let keys = Object.keys(array);

    /*   for (let key of keys){
           if(array[key] > mayor){
             mayor = array[key];
           }
         }
       }*/
    for (let i = 0; i < keys.length; i++) {
      if (array[keys[i]] > mayor) {
        mayor = array[keys[i]];
      }
    }

    return mayor;

  }

  public initReciprocalMatrix(): Array<any> {
    let reciprocalMatrix = new Array();
    let consistencia = 0;
    for (let i = 0; i < 5; i++) {
      let data = new Array();
      for (let j = 0; j < 5; j++) {
        let object = {
          'id': j,
          'value': 1
        };
        data.push(object);
      }

      // for(let object of data){
      //   reciprocalMatrix.push(object);
      // }
      reciprocalMatrix.push(data);

    }
    return reciprocalMatrix;

  }

  calculoAHP(reciprocalMatrix, vectorPromedio, consistencia) {
    let arraySuma = new Array();
    let finalNormalizeArray = new Array();
    let returnObject;

    for (let i = 0; i < reciprocalMatrix.length; i++) {
      let auxArray = new Array();

      for (let j = 0; j < reciprocalMatrix[i].length; j++) {
        auxArray.push(reciprocalMatrix[i][j].value);
      }
      finalNormalizeArray.push(auxArray);
    }


    vectorPromedio = new Array();

    for (let i = 0; i < reciprocalMatrix.length; i++) {
      let suma = 0;
      for (let j = 0; j < reciprocalMatrix[i].length; j++) {
        suma = suma + reciprocalMatrix[j][i].value;
      }
      arraySuma.push(suma);
    }

    for (let i = 0; i < reciprocalMatrix.length; i++) {
      for (let j = 0; j < reciprocalMatrix[i].length; j++) {
        let normalizeValue = reciprocalMatrix[j][i].value / arraySuma[i];
        finalNormalizeArray[j][i] = normalizeValue;
      }
    }

    for (let i = 0; i < finalNormalizeArray.length; i++) {
      let promedio = 0;
      let contador = 0;
      for (let j = 0; j < finalNormalizeArray[i].length; j++) {
        promedio = promedio + finalNormalizeArray[i][j];
        contador++;
      }
      promedio = promedio / contador;
      vectorPromedio.push(promedio);
    }


    let calculoConsistencia = 0;

    for (let i = 0; i < 5; i++) {
      calculoConsistencia = calculoConsistencia + (arraySuma[i] * vectorPromedio[i]);
    }

    consistencia = (calculoConsistencia - 5) / (5 - 1);

    consistencia = ((consistencia / 1.12) * 100).toFixed(0);

    returnObject = {
      'consistencia' : consistencia,
      'vector_promedio': vectorPromedio
    };
    return returnObject;
  }
}

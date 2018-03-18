import { Component, OnInit } from "@angular/core";
import { PeticionesService } from "../../services/servicios.service";


@Component({
  selector: 'ejecucion',
  templateUrl: './ejecucion.component.html',
  styleUrls: ['./ejecucion.component.scss'],
  providers: [PeticionesService]
})


export class EjecucionComponent implements OnInit {
  public titulo: string;
  public metodo: string;
  public references;
  public characteristics;
  public matrix: Array<any>;
  public normalizeMatrix: Array<any>;
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

  constructor(private _peticionesService: PeticionesService) {
    this.titulo = "Criterios de comparación AHP";
    this.metodo = "";
    this.matrix = new Array();
    this.normalizeMatrix = new Array();
    this.reciprocalMatrix = new Array();
    this.selectOptions = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0.5, 0.33, 0.25, 0.20, 0.17, 0.14, 0.13, 0.11];
    this.criterios = ["Eficiencia", "Tamaño de la Comunidad", "Involucramiento", "Reputacion", "Madurez"];
    this.finalNormalizeArray = new Array();
    this.vectorPromedio = new Array();
    this.consistencia = 0;
    this.resultadoObject = new Array();
    this.mostrarResultados = false;
    this.cargando == false;
    this.mostrarBotonCalculo = false;

  }


  ngOnInit() {
    console.log("Cargado ejecucion.component.ts");


  }

  selectMetodo(metodo) {
    this.metodo = metodo;
    this.cargando = true;
    if(metodo == 'rapido'){
      this.calculateMeasuserLocal();
    }else{
      this.calculateMeasuresRemote();
    }
  }

  calculateMeasuserLocal(){
    this.localJson();
    
    setTimeout(() => {
      this.calculateMatrix();
    }, 150);
  }

  calculateMeasuresRemote(){
    console.log("Entra en calculo remoto");
    this.remoteJsonProcesar();
    
  }

  remoteJsonProcesar(){
    this._peticionesService.procesar().subscribe(
      result=> {
        if(result == true){
          this.remoteJson();
        }else{
          console.log("Error en procesar");
        }
      },
      error => {
        var errorMsg = error;
        if(errorMsg !== null){
          console.log(errorMsg);
          alert("Error en el procesamiento");
        }
      }
      
    );
  }

  remoteJson(){



    this._peticionesService.getReferecencesRemote().subscribe(
      result=> {
        this.references = result;
      },
      error => {
        var errorMsg = error;
        if(errorMsg !== null){
          console.log(errorMsg);
          alert("Error en la petición a references");
        }
      }
      
    );

    this._peticionesService.getCharacteristicsRemote().subscribe(
      result=> {
        this.characteristics = result;
      },
      error => {
        var errorMsg = error;
        if(errorMsg !== null){
          console.log(errorMsg);
          alert("Error en la petición a characteristics");
        }
      }
    );

    setTimeout(() => {
      this.calculateMatrix();
    }, 10000);

  }

  localJson() {
    this._peticionesService.getReferecences().subscribe(
      callbackOk => {
        this.references = callbackOk;
        ""
        //console.log(this.references);
      },
      callbackKo => {
        var errorMsg = <any>callbackKo;
        console.log(errorMsg);
      }
    );

    this._peticionesService.getCharacteristics().subscribe(
      callbackOk => {
        this.characteristics = callbackOk;
        console.log(this.characteristics);
      },
      callbackKo => {
        var errorMsg = <any>callbackKo;
        console.log(errorMsg);
      }
    );

  }

  calculateMatrix() {

    console.log("aqui");

    var keys = Object.keys(this.characteristics.contributors);

    var efficiency, size_comunity, involvement, reputation, maturity;

    efficiency = {
      "administration_finances": 0,
      "business": 0,
      "demographics": 0,
      "education": 0,
      "ethics_democracy": 0,
      "geospatial": 0,
      "health": 0,
      "recreation_culture": 0,
      "safety": 0,
      "services": 0,
      "sustainability": 0,
      "transport_infrastructure": 0,
      "urban_planning_housing": 0,
      "welfare": 0
    };

    involvement = reputation = maturity = efficiency;

    for (var i = 0; i < keys.length; i++) {
      efficiency[keys[i]] = this.references.datasets_references_github[keys[i]] / this.references.datasets_references_ornot_github[keys[i]];
    }

    this.matrix.push(efficiency);

    size_comunity = {
      "administration_finances": 0,
      "business": 0,
      "demographics": 0,
      "education": 0,
      "ethics_democracy": 0,
      "geospatial": 0,
      "health": 0,
      "recreation_culture": 0,
      "safety": 0,
      "services": 0,
      "sustainability": 0,
      "transport_infrastructure": 0,
      "urban_planning_housing": 0,
      "welfare": 0
    };

    for (var i = 0; i < keys.length; i++) {
      size_comunity[keys[i]] = this.characteristics.contributors[keys[i]] / this.references.distinct_repositories_referencing_category[keys[i]];
    }

    this.matrix.push(size_comunity);

    involvement = {
      "administration_finances": 0,
      "business": 0,
      "demographics": 0,
      "education": 0,
      "ethics_democracy": 0,
      "geospatial": 0,
      "health": 0,
      "recreation_culture": 0,
      "safety": 0,
      "services": 0,
      "sustainability": 0,
      "transport_infrastructure": 0,
      "urban_planning_housing": 0,
      "welfare": 0
    };


    for (var i = 0; i < keys.length; i++) {
      involvement[keys[i]] = this.characteristics.contributions[keys[i]] / this.references.distinct_repositories_referencing_category[keys[i]];
    }

    this.matrix.push(involvement);

    reputation = {
      "administration_finances": 0,
      "business": 0,
      "demographics": 0,
      "education": 0,
      "ethics_democracy": 0,
      "geospatial": 0,
      "health": 0,
      "recreation_culture": 0,
      "safety": 0,
      "services": 0,
      "sustainability": 0,
      "transport_infrastructure": 0,
      "urban_planning_housing": 0,
      "welfare": 0
    };

    for (var i = 0; i < keys.length; i++) {
      reputation[keys[i]] = this.characteristics.subscribers[keys[i]] / this.references.distinct_repositories_referencing_category[keys[i]];
    }

    this.matrix.push(reputation);

    maturity = {
      "administration_finances": 0,
      "business": 0,
      "demographics": 0,
      "education": 0,
      "ethics_democracy": 0,
      "geospatial": 0,
      "health": 0,
      "recreation_culture": 0,
      "safety": 0,
      "services": 0,
      "sustainability": 0,
      "transport_infrastructure": 0,
      "urban_planning_housing": 0,
      "welfare": 0
    };


    for (var i = 0; i < keys.length; i++) {
      maturity[keys[i]] = this.characteristics.maturity[keys[i]] / this.references.distinct_repositories_referencing_category[keys[i]];
    }

    this.matrix.push(maturity);


    console.log(this.matrix);

    this.normalizeMatrixFunction();

  }


  normalizeMatrixFunction() {
    this.normalizeMatrix = this.matrix;

    var keys = Object.keys(this.matrix[0]);

    for (var i = 0; i < this.matrix.length; i++) {
      var bestValue = this.buscarMayor(this.matrix[i]);
      for (var j = 0; j < keys.length; j++) {
        this.normalizeMatrix[i][keys[j]] = this.matrix[i][keys[j]] / bestValue;
      }

    }

    var array = new Array();

    for (var i = 0; i < this.normalizeMatrix.length; i++) {
      var data = new Array();
      for (var j = 0; j < keys.length; j++) {

        data.push(this.normalizeMatrix[i][keys[j]]);
      }

      array.push(data);
    }
    console.log("array");
    console.log(array);

    this.normalizeMatrix = array;


    console.log("-----MATRIZ NORMALIZADA");
    console.log(this.normalizeMatrix);

    this.initReciprocalMatrix();



  }

  buscarMayor(array) {
    var mayor = 0;

    var keys = Object.keys(array);

    for (var i = 0; i < keys.length; i++) {
      if (array[keys[i]] > mayor) {
        mayor = array[keys[i]];
      }
    }

    return mayor;

  }

  initReciprocalMatrix() {
    //this.reciprocalMatrix = this.normalizeMatrix;
    //var keys = Object.keys(this.reciprocalMatrix);

    for (var i = 0; i < 5; i++) {
      var data = new Array();
      for (var j = 0; j < 5; j++) {
        var object = {
          "id": j,
          "value": 1
        }
        data.push(object);
      }

      this.reciprocalMatrix.push(data);
    }

    this.cargando = false;
    this.mostrarBotonCalculo = true;
    console.log("Reciprocal Matrix");
    console.log(this.reciprocalMatrix);
  }

  changeValue(index1, index2, $event) {


    // var selectValue = $event.split("/");
    // var number;

    // if (selectValue.length > 1) {
    //   let number1 = parseInt(selectValue[0]);
    //   let number2 = parseInt(selectValue[1]);
    //   number = number2;
    // } else {
    //   number = 1 / parseInt(selectValue[0]);
    // }

    // this.reciprocalMatrix[index2][index1].value = number;
    this.reciprocalMatrix[index2][index1].value = this.evaluarValor(parseFloat($event));

    this.reciprocalMatrix[index1][index2].value = parseFloat(this.reciprocalMatrix[index1][index2].value);

    //var auxNumber = this.reciprocalMatrix[index1][index2].value.split("/");

    // if (auxNumber.length > 1) {
    //   this.reciprocalMatrix[index1][index2].value = parseFloat(auxNumber[0]) / parseFloat(auxNumber[1]);
    // } else {
    //   this.reciprocalMatrix[index1][index2].value = parseFloat(this.reciprocalMatrix[index1][index2].value);
    // }



    this.calculoAHP();


    // console.log("MAAATRIZ");
    // console.log(this.reciprocalMatrix);

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

  calculoAHP() {
    var arraySuma = new Array();
    //this.finalNormalizeArray = this.reciprocalMatrix;

    //var arrayAux = new Array();
    for (var i = 0; i < this.reciprocalMatrix.length; i++) {
      var auxArray = new Array();

      for (var j = 0; j < this.reciprocalMatrix[i].length; j++) {
        auxArray.push(this.reciprocalMatrix[i][j].value);
      }
      this.finalNormalizeArray.push(auxArray);
    }


    this.vectorPromedio = new Array();
    // creamos la matriz suma
    for (var i = 0; i < this.reciprocalMatrix.length; i++) {
      var suma = 0;
      for (var j = 0; j < this.reciprocalMatrix[i].length; j++) {
        suma = suma + this.reciprocalMatrix[j][i].value;
      }
      arraySuma.push(suma);
    }

    // OK HASTA AQUI
    // creamos la matriz normalizada
    for (var i = 0; i < this.reciprocalMatrix.length; i++) {
      for (var j = 0; j < this.reciprocalMatrix[i].length; j++) {
        var normalizeValue = this.reciprocalMatrix[j][i].value / arraySuma[i];
        this.finalNormalizeArray[j][i] = normalizeValue;
      }
    }

    // calculamos el vector promedio
    for (var i = 0; i < this.finalNormalizeArray.length; i++) {
      var promedio = 0;
      var contador = 0;
      for (var j = 0; j < this.finalNormalizeArray[i].length; j++) {
        promedio = promedio + this.finalNormalizeArray[i][j];
        contador++;
      }
      promedio = promedio / contador;
      this.vectorPromedio.push(promedio);
    }


    var calculoConsistencia = 0;

    for (var i = 0; i < 5; i++) {
      calculoConsistencia = calculoConsistencia + (arraySuma[i] * this.vectorPromedio[i]);
    }

    //console.log("I24 -->" + calculoConsistencia);

    this.consistencia = (calculoConsistencia - 5) / (5 - 1);

    //console.log("CR -->" + this.consistencia);

    this.consistencia = ((this.consistencia / 1.12) * 100).toFixed(0);
  }

  calcularResultados() {

    var indicatorPriorityVector = this.normalizeMatrix.slice(0, this.normalizeMatrix.length);

    // ponderamos el vector normalizado con el vector promedio
    for (var i = 0; i < indicatorPriorityVector.length; i++) {
      for (var j = 0; j < indicatorPriorityVector[i].length; j++) {
        indicatorPriorityVector[i][j] = indicatorPriorityVector[i][j] / this.vectorPromedio[i];
      }
    }

    var resultados = new Array();

    //calculamos los resultados

    for (var i = 0; i < indicatorPriorityVector.length; i++) {
      var resultadoParcial = 0;
      for (var j = 0; j < indicatorPriorityVector[i].length; j++) {
        resultadoParcial = resultadoParcial + indicatorPriorityVector[i][j];
      }
      resultados.push(resultadoParcial);
    }

    // tratar resultados para la vista

    for (var i = 0; i < resultados.length; i++) {
      switch (i) {
        case 0:
          var object = {
            'id': 'Eficiencia',
            'value': resultados[0]
          };
          this.resultadoObject.push(object);
          break;
        case 1:
          var object = {
            'id': 'Tamaño de la comunidad',
            'value': resultados[1]
          };
          this.resultadoObject.push(object);
          break;
        case 2:
          var object = {
            'id': 'Involucramiento',
            'value': resultados[2]
          };
          this.resultadoObject.push(object);
          break;
        case 3:
          var object = {
            'id': 'Reputacion',
            'value': resultados[3]
          };
          this.resultadoObject.push(object);
          break;
        case 4:
          var object = {
            'id': 'Madurez',
            'value': resultados[4]
          };
          this.resultadoObject.push(object);
          break;
      }
    }

    this.resultadoObject.sort(function(a,b){
      return (b.value - a.value);
    });

    this.mostrarResultados = true;

  }

}

import {Component} from "@angular/core";
import {PeticionesService} from '../services/servicios.service';

@Component({
  selector: 'ejecucion',
  templateUrl: '../views/ejecucion.component.html',
  providers: [PeticionesService]
})


export class EjecucionComponent {
  public titulo:string;
  public metodo:string;
  public references;
  public characteristics;
  public matrix:Array<any>;
  public normalizeMatrix:Array<any>;
  public reciprocalMatrix:Array<any>;
  public criterios:Array<string>;
  public selectOptions:Array<string>;

  constructor(private _peticionesService : PeticionesService){
    this.titulo = "Criterios de comparación AHP";
    this.metodo = "";
    this.matrix = new Array();
    this.normalizeMatrix = new Array();
    this.reciprocalMatrix = new Array();
    this.selectOptions = ["9","8","7","6","5","4","3","2","1","1/2","1/3","1/4","1/5","1/6","1/7","1/8","1/9"];
    this.criterios = ["Eficiencia", "Tamaño de la Comunidad", "Involucramiento", "Reputacion", "Madurez"];

  }

  ngOnInit(){
    console.log("Cargado ejecucion.component.ts");
    this.calculateMeasures();

    setTimeout(() => {
      this.calculateMatrix();
    }, 150);

  }

  selectMetodo(metodo){
    this.metodo = metodo;
  }

  calculateMeasures(){
    this._peticionesService.getReferecences().subscribe(
      callbackOk => {
        this.references = callbackOk;
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

  calculateMatrix(){

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

    involvement= reputation = maturity= efficiency;

    for(var i=0; i< keys.length; i++){
      efficiency[keys[i]] = this.references.datasets_references_github[keys[i]]/this.references.datasets_references_ornot_github[keys[i]];
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

    for(var i=0; i< keys.length; i++){
      size_comunity[keys[i]] = this.characteristics.contributors[keys[i]]/this.references.distinct_repositories_referencing_category[keys[i]];
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


    for(var i=0; i< keys.length; i++){
      involvement[keys[i]] = this.characteristics.contributions[keys[i]]/this.references.distinct_repositories_referencing_category[keys[i]];
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

    for(var i=0; i< keys.length; i++){
      reputation[keys[i]] = this.characteristics.subscribers[keys[i]]/this.references.distinct_repositories_referencing_category[keys[i]];
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


    for(var i=0; i< keys.length; i++){
      maturity[keys[i]] = this.characteristics.maturity[keys[i]]/this.references.distinct_repositories_referencing_category[keys[i]];
    }

    this.matrix.push(maturity);


    console.log(this.matrix);

    this.normalizeMatrixFunction();

  }


  normalizeMatrixFunction(){
    this.normalizeMatrix = this.matrix;

    var keys = Object.keys(this.matrix[0]);

    for(var i=0; i< this.matrix.length; i++){
      var bestValue = this.buscarMayor(this.matrix[i]);
      for(var j=0; j<keys.length; j++){
        this.normalizeMatrix[i][keys[j]] = this.matrix[i][keys[j]]/bestValue;
      }

    }

    var array = new Array();

    for(var i=0; i< this.normalizeMatrix.length; i++){
      var data = new Array();
      for(var j=0; j< keys.length; j++){

        data.push(this.normalizeMatrix[i][keys[j]]);
      }

      array.push(data);
    }
console.log("array");
    console.log(array);

    this.normalizeMatrix = array;


    console.log(this.normalizeMatrix);

    this.initReciprocalMatrix();



  }

  buscarMayor(array){
    var mayor = 0;

    var keys = Object.keys(array);

    for(var i=0; i<keys.length; i++){
      if(array[keys[i]] > mayor){
        mayor = array[keys[i]];
      }
    }

    return mayor;

  }

  initReciprocalMatrix(){
    //this.reciprocalMatrix = this.normalizeMatrix;
    //var keys = Object.keys(this.reciprocalMatrix);

    for(var i=0; i< 5; i++){
      var data = new Array();
      for(var j=0; j< 5; j++){
        data[j]= 1;
      }

      this.reciprocalMatrix.push(data);
    }

    console.log("Reciprocal Matrix");
    console.log(this.reciprocalMatrix);
  }

}


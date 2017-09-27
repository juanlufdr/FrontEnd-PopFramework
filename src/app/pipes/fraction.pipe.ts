import { Pipe, PipeTransform } from '@angular/core';

@Pipe(
  {name: 'fraction'}
)

export class FractionPipe implements PipeTransform{
  transform(value){

    console.log("Filtro fraction");

    

    if(typeof value == 'string'){

      let arrayValue = value.split("/");
      if(arrayValue.length ==1){
        value = parseFloat(value);
      }else{
        value = parseFloat(arrayValue[0])/parseFloat(arrayValue[1]);
      }
    }

    let number = value.toFixed(2);

    let variable = "1";

    switch (number){
      case "9.00":
        variable = "9";
        break;
      case "8.00":
        variable = "8";
        break;
      case "7.00":
        variable = "7";
        break;
      case "6.00":
        variable = "6";
        break;
      case "5.00":
        variable = "5";
       break;
      case "4.00":
        variable = "4";
       break;
      case "3.00":
        variable = "3";
        break;
      case "2.00":
        variable = "2";
       break;
      case "1.00":
       variable = "1";
       break;
      case "0.50":
       variable = "1/2";
       break;
      case "0.33":
        variable = "1/3";
        break;
      case "0.25":
        variable = "1/4";
        break;
      case "0.20":
        variable = "1/5";
        break;
      case "0.17":
        variable = "1/6";
        break;
      case "0.14":
        variable = "1/7";
        break;
      case "0.13":
        variable = "1/8";
        break;
      case "0.11":
        variable = "1/9";
        break;
    }


/*    switch (number){
      case 0.17:
        return "1/6";
      default:
        break;
    }*/

    return variable;
  }
}

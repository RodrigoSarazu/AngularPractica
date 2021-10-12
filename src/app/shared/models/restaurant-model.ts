import { LightRestaurant } from "./restaurant-light-model";

//Extendemos la clase restaurant agregando el LightRestaurant llamando los demás campos 
//el cual va abstraer todos los datos
export class Restaurant extends LightRestaurant{
    description:String='';
    //para llamar arreglo de turnos 
    turns: any[] = [];
    price:number=0;
}
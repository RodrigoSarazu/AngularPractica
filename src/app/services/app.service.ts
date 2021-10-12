import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LightRestaurant } from '../shared/models/restaurant-light-model';
import {HttpClient, HttpHeaders}from '@angular/common/http';
import { Booking } from '../shared/models/booking-models';

//api
const API='http://localhost:8080/burger/v1/'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  //llamando al http para llamar a la petición api
  constructor(private http:HttpClient) { }


  cancelReservation(reservationCode:string){
    const options={
      //aquí estamos pasando un objeto
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.delete(API+'deleteReservation?locator='+reservationCode,options)
  }

  createReservation(booking:Booking){
    return this.http.post(API+'reservation',booking)
  }

  getRestaurant(id:number){
    return this.http.get(API+'restaurant'+'/'+id)
  }

  //función para hacer la petició a la api
  getAllRestaurants(){
    return this.http.get(API+'restaurant')
  }

  getAllRestaurantsMock(){
    //creando datos de prueba
    const restaurants:LightRestaurant[]=[]

    let restaurant=new LightRestaurant();
    restaurant.address='Gran via 123';
    restaurant.id=1;
    restaurant.image='https://www.peru.travel/Contenido/Noticia/Imagen/pe/174/1.1/Principal/88.jpg';
    restaurant.name="Restaurante Rodrigo";

    //agregando un constante
    const restaurant2: LightRestaurant={
      address:"gran rambla",
      id:2,
      image:"https://media-cdn.tripadvisor.com/media/photo-s/1b/40/3b/65/narutojapanesefood-local.jpg",
      name:"Antonio"
    }
    restaurants.push(restaurant)
    restaurants.push(restaurant2)

    //enviando restaurants
    return of(restaurants)

  }
}

import { PaymentConfirm, PaymentIntent } from './../shared/models/payment-model';
import { Injectable } from '@angular/core';
import { Booked } from '../shared/models/payment-model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  //privada significa que solo se puede acceder desde el mismo componente
  private booked:Booked;
  //api
  private API='http://localhost:8080/burger/v1/';
  constructor(private http:HttpClient) { }
  setBooked(booked: Booked) {
    this.booked = booked
  }
  getBooked(){
    return this.booked
  }
  buy(payment:PaymentIntent){
    return this.http.post(this.API+'paymentIntent',payment);
  }
  cancel(id:string){
   return this.http.post(this.API+'cancel/',id,{});
  }
  confirm(paymentConfirm:PaymentConfirm){
    return this.http.post(this.API+'confirm',paymentConfirm);
  }
}

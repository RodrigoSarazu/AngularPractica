import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { info } from 'console';
import { AppService } from 'src/app/services/app.service';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
import { Booking } from 'src/app/shared/models/booking-models';
import { Restaurant } from 'src/app/shared/models/restaurant-model';
import { BookingFormComponent } from './booking-form/booking-form.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  @ViewChild(BookingFormComponent)bookingForm:BookingFormComponent

  public restaurant=new Restaurant();
  public bookingForm
  public booking=new Booking();

  //identificar pasando del explore
  private idRestaurant:number;
  constructor(
    private service:AppService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    //va a llamar por el id escogido en reserva
    //cambiando a numero
    this.idRestaurant=Number(this.route.snapshot.paramMap.get('id'))
    //llamando a función
    this.getRestaurant()
  }

  getRestaurant(){
    this.service.getRestaurant(this.idRestaurant).subscribe((result:any)=>{
      this.bookingForm.restaurant=result.data
      this.restaurant=result.data
    })
  }
  


}

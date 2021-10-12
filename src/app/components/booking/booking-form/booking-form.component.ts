import { PaymentService } from './../../../services/payment.service';
import { Restaurant } from 'src/app/shared/models/restaurant-model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
import { Booking } from 'src/app/shared/models/booking-models';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {

  public booking=new Booking();
  public bookingForm
  @Input()restaurant:Restaurant

  constructor(private fb:FormBuilder,
    private service:AppService,
    public dialog: MatDialog,
    private router:Router,
    private paymentService:PaymentService) { }
  ngOnInit(): void {
    this.initForm()
  }
  payBooking(){
    this.setBooking()
    this.service.createReservation(this.booking).subscribe((result:any)=>{
      //console.log(result.data)
      //esto va a servir para mostrar el dialog
      //const title="CÓDIGO DE RESERVA: "+result.data
      //const info="Necesitaras el código para poder acceder al restaurante o cancelar la reserva. Por favor guardalo en un lugar seguro"
      //this.openDialog(title,info)
      this.paymentService.setBooked({ ...this.booking, locator: result.data})
      this.router.navigate(['payment'])

    })
  }


  sendBooking(){
    this.setBooking()
    this.service.createReservation(this.booking).subscribe((result:any)=>{
      console.log(result.data)
      //esto va a servir para mostrar el dialog
      const title="CÓDIGO DE RESERVA: "+result.data
      const info="Necesitaras el código para poder acceder al restaurante o cancelar la reserva. Por favor guardalo en un lugar seguro"
      this.openDialog(title,info)
    })
  }
  //inicializar el formulario
  initForm(){
    //validación
    this.bookingForm=this.fb.group({
      date:[new Date(),Validators.required],
      time:['',Validators.required],
      customers:['',Validators.required],
      name:['',Validators.required],
      email:['',Validators.required]
    })
  }
  //creando función setBooking en el cual una variable va a guardar los datos ingresados
   setBooking(){
     this.booking.restaurantId=this.restaurant.id;
     //cuando es relacional se debe llamar por un get indicando su valor en comillas y llamando el valor
     this.booking.turnId=this.bookingForm.get('time').value;
     this.booking.date=this.bookingForm.get('date').value;
     this.booking.person=this.bookingForm.get('customers').value;
     this.booking.name=this.bookingForm.get('name').value;
     this.booking.email=this.bookingForm.get('email').value;
     this.booking.price=this.restaurant.price;
    }

  openDialog(title:string,info:string): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '350px',
      data: {title:title, info:info}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}

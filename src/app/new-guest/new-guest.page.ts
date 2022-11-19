import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.page.html',
  styleUrls: ['./new-guest.page.scss'],
})
export class NewGuestPage implements OnInit {

  today: any;
  selectedDate: any;
  public guest: Guest;
  public myForm: FormGroup;
  public validationMessages: Object;

  constructor(private guestService:GuestService,
    private fb: FormBuilder,
    private toast:ToastController,
    private router:Router) { }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        room: ['', Validators.compose([Validators.required,Validators.min(1)])],
        advanced_payment: ['', Validators.compose([Validators.required,Validators.min(1)])],
        room_cost: ['', Validators.compose([Validators.required,Validators.min(1)])],
        name: ["", Validators.required],
        phone: ["", Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(10)])],
        date_in: ["", Validators.compose([Validators.required])],
        date_out: ["", Validators.compose([Validators.required])]
      }
    );
    this.validationMessages = {
      "phone": [
        {
          "type": "required",
          "message": "El télefono es obligatorio"
        },
        {
          "type": "minlength",
          "message": "El télefono debe ser de 10 dígitos"
        },
        {
          "type": "maxlength",
          "message": "El télefono debe ser de 10 dígitos"
        }
      ],
      "name": [{ type: 'required', message: 'El nombre es obligatorio' }],
      "date_in": [{ type: 'required', message: 'La fecha de entrada es obligatoria' }],
      "date_out": [{ type: 'required', message: 'La fecha de salida es obligatoria' }],
      "room": [
        { type: 'required', message: 'La habitación es obligatoria' },
        { type: 'min', message: 'La habitación no puede ser 0' }
      ],
      "advanced_payment": [
        { type: 'required', message: 'El anticipo es obligatorio' },
        { type: 'min', message: 'El anticipo no puede ser 0' }
      ],
      "room_cost": [
        { type: 'required', message: 'El costo es obligatorio' },
        { type: 'min', message: 'El costo no puede ser 0' }
      ],
    }
  }

  public newGuest(data):void{
    let date_in = data.date_in;
    let formattedString = format(parseISO(date_in), 'dd-MM-yyyy');
     this.guest = data;
    this.guest.date_in = formattedString;
    let date_out = data.date_out;
    formattedString = format(parseISO(date_out), 'dd-MM-yyyy');
    this.guest.date_out = formattedString;
    if(date_in>date_out){
      return console.log('La fecha esta mal');      
    }
    this.guest.token = this.createToken(data);
    this.presentToast('bottom','Se agregó el huesped correctamente');
    this.guestService.newGuest(this.guest)
    this.router.navigate(['view-rooms-list'])
  }

  private createToken(data):string{
    let token = '';
    token = (data.name.substring(0,2)+data.name.slice(-2)).toUpperCase();
    let num = Math.ceil(Math.random() * 10 * 1000) ;
    let str = num.toString();
    if(num<100){
      str +=Math.ceil(Math.random() * 10).toString() +Math.ceil(Math.random() * 10).toString();
    }
    
    if(num<1000){
      str += Math.ceil(Math.random() * 10).toString();
    }
    token +=str;
    return token;
  }

  public async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toast.create({
      message,
      duration: 1500,
      position,
      cssClass: 'custom-toast',
    });
    await toast.present();
  }
}

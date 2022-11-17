import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { GuestService } from '../services/guest.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public myForm: FormGroup;
  public validationMessages: Object;

  private ADMIN = 10004

  constructor(
    private guest:GuestService,
    private fb: FormBuilder,
    private toast: ToastController,
    private route: Router) { }

    ngOnInit() {
      this.myForm = this.fb.group(
        {
          controlNumber: ["", Validators.compose([Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern('^[0-9]+$')])],
          nip: ["", Validators.compose([Validators.required, Validators.min(10), Validators.max(9999)])],
        }
      );
      this.validationMessages = {
        "controlnumber": [
          {
            "type": "required",
            "message": "Número de control obligatorio"
          },
          {
            "type": "minlength",
            "message": "El número de control debe ser de 8 dígitos"
          },
          {
            "type": "maxlength",
            "message": "El número de control debe ser de 8 dígitos"
          },
          {
            "type": "pattern",
            "message": "El número de control está mal ingresado"
          }
        ],
        "nip": [
          { type: 'required', message: 'El NIP es obligatorip' },
          { type: 'min', message: 'NIP demasiado corto' },
          { type: 'miax', message: 'NIP demasiado largo' },
        ]
      }
    }
  

  admin(){
    this.route.navigate(['view-rooms-list'])
  }

  guesped(){
    this.route.navigate(['tabs'])
  }

  public login(data){

  }
}

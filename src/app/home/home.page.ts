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

  private ADMIN = 'ADMI0000'

  constructor(
    private guestService:GuestService,
    private fb: FormBuilder,
    private toast: ToastController,
    private route: Router) { }

    ngOnInit() {
      this.myForm = this.fb.group(
        {
          token: ["", Validators.compose([Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)])]
        }
      );
      this.validationMessages = {
        "token": [
          {
            "type": "required",
            "message": "Token obligatorio"
          },
          {
            "type": "minlength",
            "message": "El Token debe ser de 8 dígitos"
          },
          {
            "type": "maxlength",
            "message": "El Token debe ser de 8 dígitos"
          }
        ]
      }
    }
  

  goAdminPage(){
    this.route.navigate(['view-rooms-list'])
  }

  goGuestPage(){
    this.route.navigate(['tabs'])
  }

  public login(data){
    const token = data.token;
    if(token===this.ADMIN)
      this.goAdminPage();
    else{
      const guest = this.guestService.getGuestByToken(token);
      if(guest){
        this.goGuestPage();
      }
      else{
        console.log('no existe');
        
      }
    }
  }
}

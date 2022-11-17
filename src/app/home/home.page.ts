import { Component, Input } from '@angular/core';
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
    private guestService: GuestService,
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


  goAdminPage() {
    this.route.navigate(['view-rooms-list'])
  }

  goGuestPage() {
    this.route.navigate(['tabs'])
  }

  clic() {
    if (this.myForm.valid)
    this.login(this.myForm.value)
    else
    this.presentToast('bottom','Ingrese correctamente el token')


  }

  public login(data) {
    const token = data.token;
    if (token === this.ADMIN) {
      this.goAdminPage();
      this.presentToast('bottom', 'Bienvenido administrador');
    } else {
      const guest = this.guestService.getGuestByToken(token);
      if (guest) {
        this.goGuestPage();
        this.presentToast('bottom', `Bienvenido ${guest.name}`);
      }
      else {
        this.presentToast('bottom', 'No exite un huesped con ese token')

      }
    }
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

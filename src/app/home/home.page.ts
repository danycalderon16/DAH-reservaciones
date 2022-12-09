import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { GuestService } from '../services/guest.service';
import { Guest } from '../models/guest';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public myForm: FormGroup;
  public validationMessages: Object;
  private guests:Guest[]=[];
  private ADMIN = 'ADMI0000'

  constructor(
    private guestService: GuestService,
    private fb: FormBuilder,
    private toast: ToastController,
    private route: Router,
    private translateService:TranslateService) { 
    
    }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        token: ["ADMI0000", Validators.compose([Validators.required,
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

  goGuestPage(guest:Guest) {
    this.guestService.setCurrentGuest(guest);
    this.route.navigate(['tabs']);
  }
  public getGuestByToken(token:string):Guest{
    return this.guests.find(guest=>{
      return guest.token === token;
    });
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
        console.log(guest);
        this.translateService.use(guest.language);
        this.presentToast('bottom', `${this.translateService.instant("BIENVENIDO")} ${guest.name}`);
        this.goGuestPage(guest);
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

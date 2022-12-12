import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  public guest:Guest;
  langs: string[]=[];
  public language:string;

  constructor(private guestService: GuestService,private router:Router,
     private translateService: TranslateService,
     private alert:AlertController) { 
    this.guest = this.guestService.getCurrentUser();
    this.langs = this.translateService.getLangs();
    guestService.setLanguage(this.guest.language);
    this.language = guestService.getLanguage();
    translateService.use(guestService.getLanguage());
  }
  changeLang(event){
    this.guestService.setLanguage(event.detail.value);
    this.translateService.use(event.detail.value);     
    this.language = this.guestService.getLanguage()
  }

  ngOnInit() {
  }

  public async logOut() {
    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de salir de la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {          
              this.router.navigate(['home']);
          },
        },
      ],
    });
    await alert.present();
  }

}

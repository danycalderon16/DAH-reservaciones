import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  public guest: Guest;
  public todaysDate = new Date()
  public dateIn: Date;
  public dateOut: Date;

  public show: boolean;
  public key: string
  langs: string[] = [];
  public language: string;

  constructor(private guestService: GuestService, private router: Router,
    private translateService: TranslateService,
    private alert:AlertController) {
    this.guest = this.guestService.getCurrentUser();
    this.langs = this.translateService.getLangs();
    guestService.setLanguage(this.guest.language);
    this.language = guestService.getLanguage();
    translateService.use(guestService.getLanguage());
  }

  changeLang(event) {
    this.guestService.setLanguage(event.detail.value);
    this.translateService.use(event.detail.value);
    this.language = this.guestService.getLanguage()
  }

  ngOnInit() {
    this.language = this.guestService.getLanguage();
    // this.guestService.setCurrentGuest(this.guestService.getGuestByToken('DAON1001'));
    this.dateComparator();
    this.key = this.generateKet();
    let array = this.guest.date_in.split('-');
    let aux = array[2];
    array[2] = array[0];
    array[0] = aux
    let str = array[0] + "-" + array[1] + "-" + array[2]
    this.dateIn = new Date(str);
    array = this.guest.date_out.split('-');
    aux = array[2];
    array[2] = array[0];
    array[0] = aux
    str = array[0] + "-" + array[1] + "-" + array[2]
    this.dateOut = new Date(str);
  }

  private dateComparator(): void {
    let str = this.todaysDate.toLocaleDateString();
    str = str.replace('/', '-');
    str = str.replace('/', '-');
    this.show = (str >= this.guest.date_in) && (str <= this.guest.date_out);
  }

  private generateKet(): string {
    let key = '';
    for (let i = 0; i < 8; i++) {
      key += String.fromCharCode(Math.floor(Math.random() * 25) + 65)
    }
    return key;
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

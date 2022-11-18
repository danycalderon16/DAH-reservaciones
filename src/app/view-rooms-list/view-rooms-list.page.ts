import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-view-rooms-list',
  templateUrl: './view-rooms-list.page.html',
  styleUrls: ['./view-rooms-list.page.scss'],
})
export class ViewRoomsListPage implements OnInit {

  public guests: Guest[];

  constructor(
    private guestService: GuestService,
    private alertController: AlertController,
    private toast: ToastController,
    private router: Router
  ) {
    this.guests = guestService.getGuests();
  }

  ngOnInit() {
  }

  newGuest() {
    this.router.navigate(['new-guest'])
  }

  public async removeGuest(pos: number) {

    const alert = await this.alertController.create({
      header: '¿Está seguro de borrar este huesped?',
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
            this.guestService.removeGuest(pos);
            this.guests = this.guestService.getGuests();
           this.presentToast('bottom','Se elimino correctamente el huesped');
          }
        }
      ]
    });
    await alert.present();
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
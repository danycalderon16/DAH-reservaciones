import { Component, OnInit, ViewChild } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoService } from '../services/photo.service';
import { AlertController, IonSlides, LoadingController, ToastController } from '@ionic/angular';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  @ViewChild('mySlider')  slides: IonSlides;

  selectedImage: any;
  public photos:string[] = []

  private todaysDate = new Date()

  public show: boolean;
  private guest: Guest;
  langs: string[] = [];
  public language: string;

  constructor(private photoService:PhotoService,
    private loadingController:LoadingController,
    private toastController:ToastController,
    private guestService: GuestService, 
    private router: Router,
    private alert:AlertController,
    private translateService: TranslateService) {
      this.photos = photoService.getFileList();          
      this.guest = this.guestService.getCurrentUser();
      this.langs = this.translateService.getLangs();
      guestService.setLanguage(this.guest.language);
      this.language = guestService.getLanguage();
      translateService.use(guestService.getLanguage());
     }

  ngOnInit() {
    this.dateComparator()
  }

  swipeNext(){
    this.slides.slideNext();
  }

  checkPlatformForWeb() {
    if(Capacitor.getPlatform() == 'web' || Capacitor.getPlatform() == 'ios') return true;
    return false;
  }

  async getPicture() {    
    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Prompt,
      width: 600,
      resultType: this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.Uri
    });
    console.log('image: ', image);
    
    this.selectedImage = image;
    if(this.checkPlatformForWeb()) this.selectedImage.webPath = image.dataUrl;
  }

  public async savePicture(){
    this.loadingController.create({
      message: 'Subiendo foto, por favor espere...'
    }).then((loading) => {

      loading.present();

      this.photoService.savePicture(this.selectedImage)
        .catch((err) => {
          console.log(err);
          loading.dismiss();
        })
        .then((results) => {
          console.log(results);          
          loading.dismiss();
          this.photos = this.photoService.getFileList();     
          this.presentToast('bottom','La foto se ha subido correctamente');
        });

    })
  }
  public async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position,
      cssClass: 'custom-toast',
    });
    await toast.present();
  }
  changeLang(event) {
    this.guestService.setLanguage(event.detail.value);
    this.translateService.use(event.detail.value);
    this.language = this.guestService.getLanguage()
  }
  private dateComparator(): void {
    let str = this.todaysDate.toLocaleDateString();
    str = str.replace('/', '-');
    str = str.replace('/', '-');
    this.show = (str >= this.guest.date_in) && (str <= this.guest.date_out);
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


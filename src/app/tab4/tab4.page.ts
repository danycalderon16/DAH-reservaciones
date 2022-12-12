import { Component, OnInit, ViewChild } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoService } from '../services/photo.service';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  @ViewChild('mySlider')  slides: IonSlides;

  selectedImage: any;
  public photos:string[] = []

  constructor(private photoService:PhotoService,
    private loadingController:LoadingController,
    private toastController:ToastController) {
      this.photos = photoService.getFileList();      
     }

  ngOnInit() {
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
}


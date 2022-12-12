import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Photo } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {


  public filelist = [];
  public src = '';
  public putblob: any;

  constructor(private storage: AngularFireStorage) { }


  private getFileList() {
    this.filelist = []
    const pre = 'images/guests/0fLpXd4IdCIXAyPS0hO4/photos/'
    const ref = this.storage.ref(pre);
    let myurlsubscription = ref.listAll().subscribe((data) => {
      for (let i = 0; i < data.items.length; i++) {
        let name = data.items[i].name;
        let newref = this.storage.ref(pre + data.items[i].name);
        let url = newref.getDownloadURL().subscribe((data) => {
          this.filelist.push(data)
        });
      }
      console.log(this.filelist)
    });
  }


  public async savePicture(photo: Photo): Promise<any> {
    const base64Data = await this.readAsBase64(photo);
    const fileName = "" + new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
    return new Promise((resolve, reject) => {
      const ref = this.storage.ref('images/guests/0fLpXd4IdCIXAyPS0hO4/photos/' + fileName)
      ref.put(this.putblob).then((res) => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });

    // return {
    //   filepath: fileName,
    //   webviewPath: photo.webPath
    // };
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    this.putblob = blob
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}

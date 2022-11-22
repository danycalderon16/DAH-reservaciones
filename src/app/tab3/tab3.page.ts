import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
     private translateService: TranslateService) { 
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
  logOut(){
    this.router.navigate(['home']);
  }
}

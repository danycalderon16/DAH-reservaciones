import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  langs: string[]=[];
  public language:string;

  constructor(private guestService: GuestService,private router:Router,
     private translateService: TranslateService) { 
    this.langs= this.translateService.getLangs();
    translateService.use(guestService.getLanguage());
  }
  changeLang(event){
    this.guestService.setLanguage(event.detail.value);
    this.translateService.use(event.detail.value);     
    this.language = this.guestService.getLanguage()
  }

  ngOnInit() {
    this.language=this.guestService.getLanguage();
  }
  logOut(){
    this.router.navigate(['home']);
  }
}

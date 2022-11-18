import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  private guest: Guest;
  private todaysDate = new Date()

  public show:boolean;
  public key:string

  constructor(private guestService: GuestService,private router:Router) { }

  ngOnInit() {
    this.guest = this.guestService.getCurrentUser();
    this.dateComparator();
    this.key = this.generateKet();
  }

  private dateComparator():void{
    let str = this.todaysDate.toLocaleDateString();
    str = str.replace('/','-');
    str = str.replace('/','-');
    this.show = (str >= this.guest.date_in) && (str<=this.guest.date_out);    
  }

  private generateKet():string{
    let key = '';
    for (let i = 0; i < 8; i++) {
      key +=String.fromCharCode(Math.floor(Math.random() * 25)+65)
    }
    return key;
  }
  logOut(){
    this.router.navigate(['home']);
  }
}

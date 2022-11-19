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

  public guest: Guest;
  public todaysDate = new Date()
  public dateIn:Date;
  public dateOut:Date;

  public show:boolean;
  public key:string

  constructor(private guestService: GuestService,private router:Router) { }

  ngOnInit() {
    this.guestService.setCurrentGuest(this.guestService.getGuestByToken('DAON1001'));
    this.guest = this.guestService.getCurrentUser();
    this.dateComparator();
    this.key = this.generateKet();
    let array = this.guest.date_in.split('-');
    let aux = array[2];
    array[2] = array[0];
    array[0] = aux
    let str = array[0]+"-"+array[1]+"-"+array[2] 
    this.dateIn = new Date(str);
    array = this.guest.date_out.split('-');
    aux = array[2];
    array[2] = array[0];
    array[0] = aux
    str = array[0]+"-"+array[1]+"-"+array[2] 
    this.dateOut = new Date(str);
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

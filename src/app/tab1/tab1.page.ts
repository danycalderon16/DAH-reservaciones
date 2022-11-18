import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  private guest: Guest;
  private todaysDate = new Date()

  public show:boolean;

  constructor(private guestService: GuestService,private router:Router) { }

  ngOnInit() {
    this.guest = this.guestService.getCurrentUser();
    this.dateComparator()
  }

  private dateComparator():void{
    let str = this.todaysDate.toLocaleDateString();
    str = str.replace('/','-');
    str = str.replace('/','-');
    this.show = (str >= this.guest.date_in) && (str<=this.guest.date_out);    
  }
  logOut(){
    this.router.navigate(['home']);
  }
}

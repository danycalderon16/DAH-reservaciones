import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private guestService:GuestService,
    private router:Router
  ) { 
    this.guests = guestService.getGuests();
  }

  ngOnInit() {
  }

  newGuest(){
    this.router.navigate(['new-guest'])
  }

}
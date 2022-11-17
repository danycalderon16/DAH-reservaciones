import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private guests : Guest[];

  constructor() { 
    this.guests = [
      {
        token:'1001',
        name:'Daniel Calderón',
        date_in : '16-11-1999',
        date_out : '16-11-1999',
        phone:'3111590913',
        room:23
      },
      {
        token:'1002',
        name:'Antonio Moreno',
        date_in : '16-11-1999',
        date_out : '16-11-1999',
        phone:'3111590913',
        room:24
      },
      {
        token:'1003',
        name:'Segio Carrillo',
        date_in : '16-11-1909',
        date_out : '16-11-1909',
        phone:'3111590913',
        room:25
      }
    ]
  }

  public getGuests():Guest[]{
    return this.guests;
  }

  public newGuest(guest:Guest):void{
    this.guests.push(guest);
  }
}
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
        token:'DAON1001',
        name:'Daniel Calderón',
        date_in : '16-11-2022',
        date_out : '19-11-2022',
        phone:'3111590913',
        room:23
      },
      {
        token:'ANMO1002',
        name:'Antonio Moreno',
        date_in : '01-12-2022',
        date_out : '07-13-2022',
        phone:'3111590913',
        room:24
      },
      {
        token:'SELO1003',
        name:'Segio Carrillo',
        date_in : '16-11-2022',
        date_out : '21-12-2022',
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

  public getGuestByToken(token:string):Guest{
    // let guest: Guest;

    return this.guests.find(guest=>{
      return guest.token === token;
    });
  }

  public removeGuest(pos:number){
    return this.guests.splice(pos,1);
  }
}

import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private guests : Guest[];
  private currentGuest:Guest;
  private language : string;

  constructor() { 
    this.guests = [
      {
        token:'DAON1001',
        name:'Daniel Calderón',
        date_in : '15-11-2022',
        date_out : '29-11-2022',
        phone:'3111590913',
        room:23,
        room_cost:2500,
        advanced_payment:1000,
        remainder:1500,
        language:'ingles'
      },
      {
        token:'ANMO1002',
        name:'Antonio Moreno',
        date_in : '01-12-2022',
        date_out : '07-13-2022',
        phone:'3111590913',
        room:24,
        room_cost:2500,
        advanced_payment:1000,
        remainder:1500,
        language:'español'
      },
      {
        token:'SELO1003',
        name:'Segio Carrillo',
        date_in : '30-11-2022',
        date_out : '5-12-2022',
        phone:'3111590913',
        room:25,
        room_cost:2500,
        advanced_payment:1000,
        remainder:1500,
        language:'español'
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
    return this.guests.find(guest=>{
      return guest.token === token;
    });
  }

  public removeGuest(pos:number){
    return this.guests.splice(pos,1);
  }

  public setCurrentGuest(guest:Guest):void{
    this.currentGuest = guest;
  }

  public getCurrentUser():Guest{
    return this.currentGuest;
  }

  public getLanguage():string{
    return this.language;
  }

  public setLanguage(value:string):void{
    this.language = value;
  }
}

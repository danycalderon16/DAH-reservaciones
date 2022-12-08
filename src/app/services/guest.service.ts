import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private guests : Guest[];
  private currentGuest:Guest;
  private language : string;

  constructor(private firestore:AngularFirestore) { 
    // this.guests = [
    //   {
    //     token:'DAON1001',
    //     name:'Daniel Calderón',
    //     date_in : '15-11-2022',
    //     date_out : '29-11-2022',
    //     phone:'3111590913',
    //     room:23,
    //     room_cost:2500,
    //     advanced_payment:1000,
    //     remainder:1500,
    //     language:'ingles'
    //   },
    //   {
    //     token:'ANMO1002',
    //     name:'Antonio Moreno',
    //     date_in : '01-12-2022',
    //     date_out : '07-13-2022',
    //     phone:'3111590913',
    //     room:24,
    //     room_cost:2500,
    //     advanced_payment:1000,
    //     remainder:1500,
    //     language:'español'
    //   },
    //   {
    //     token:'SELO1003',
    //     name:'Segio Carrillo',
    //     date_in : '30-11-2022',
    //     date_out : '5-12-2022',
    //     phone:'3111590913',
    //     room:25,
    //     room_cost:2500,
    //     advanced_payment:1000,
    //     remainder:1500,
    //     language:'español'
    //   }
    // ]
    this.getGuestsFB().subscribe(res=>{
      this.guests=res;
    })
  }
  public getGuestsFB():Observable<Guest[]>{
    return this.firestore.collection('Guests').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data() as Guest;
          const id = a.payload.doc.id;
          return {id,...data};
        })
      })
    )
  }
  // public getGuestByTokenFB(){
  //   return this.firestore.collection('Guests').get()
  // }
  public newGuestFB(guest:Guest){
    this.firestore.collection('Guests').add(guest);
  }
  public removeGuestFB(id:string){
    this.firestore.collection('Guests').doc(id).delete();
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

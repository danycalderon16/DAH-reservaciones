import { Injectable } from '@angular/core';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private rooms: Room[];

  private reservedRooms: number[];
  constructor() {
    this.rooms = [
      {
        number_room: 23,
        guest_token: 'DAON1001',
        date_in: '25-11-2022',
        date_out: '29-11-2022',
      },
      {
        guest_token: 'ANMO1002',
        date_in: '01-12-2022',
        date_out: '07-13-2022',
        number_room: 24
      },
      {
        guest_token: 'SELO1003',
        date_in: '30-11-2022',
        date_out: '5-12-2022',
        number_room: 25
      }
    ]
  }

  getReservedRooms(): number[] {
    let reserved = [];
    this.rooms.map(room => reserved.push(room.number_room));
    return reserved;
  }

  getReservedRoom(num: number): Room {
    return this.rooms.find(room => {
      return room.number_room === num;
    });
  }

  isReserved(num: number,date_in:string): boolean {    
    let room = this.getReservedRoom(num);
    console.log("room",room);
    if(room == undefined){
       console.log('no hay reservación');      
       return;
    }   
    return this.validateDates(room.date_out,date_in)
    
  }

  isAvallible(num: number): boolean {
    return !this.rooms.some(room=>room.number_room===num)
  }

  validateDates(date_out:string,date_in:string):boolean{
    return date_in<date_out;
  }
}

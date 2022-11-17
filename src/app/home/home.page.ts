import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private route:Router
  ) {}

  admin(){
    this.route.navigate(['view-rooms-list'])
  }

  guesped(){
    this.route.navigate(['tabs'])
  }
}

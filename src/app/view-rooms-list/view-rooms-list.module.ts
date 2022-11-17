import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRoomsListPageRoutingModule } from './view-rooms-list-routing.module';

import { ViewRoomsListPage } from './view-rooms-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRoomsListPageRoutingModule
  ],
  declarations: [ViewRoomsListPage]
})
export class ViewRoomsListPageModule {}

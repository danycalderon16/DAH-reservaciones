import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRoomsListPage } from './view-rooms-list.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRoomsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoomsListPageRoutingModule {}

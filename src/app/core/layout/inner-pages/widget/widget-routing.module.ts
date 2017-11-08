import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateWidgetComponent } from './create-widget/create-widget.component'
import { ListWidgetComponent } from './list-widget/list-widget.component'

const routes: Routes = [
  { path: 'create', component: CreateWidgetComponent },
  { path: 'list', component: ListWidgetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetRoutingModule { }

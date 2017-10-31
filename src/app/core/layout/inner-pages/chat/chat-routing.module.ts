import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OngoingComponent } from './ongoing/ongoing.component';
import { PendingComponent } from './pending/pending.component';
import { RejectedComponent } from './rejected/rejected.component';
import { ResolveComponent } from './resolve/resolve.component';

const routes: Routes = [
  { path: 'pending', component: PendingComponent },
  { path: 'ongoing', component: OngoingComponent },
  { path: 'rejected', component: RejectedComponent },
  { path: 'resolve',  component: ResolveComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }

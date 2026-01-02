import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './components/parent/parent.component';
import { DeadlineTimerComponent } from './components/deadline-timer/deadline-timer.component';

export const routes: Routes = [
  { path: 'deadline', component: DeadlineTimerComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history.component';

const historyRoutes: Routes = [
  {
    path: '',
    component: HistoryComponent
  }
];

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(historyRoutes)
  ]
})
export class HistoryModule { }

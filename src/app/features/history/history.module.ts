import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history.component';
import { TruncatePipe } from 'src/truncate.pipe';
import { SafePipe } from 'src/safe.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';

const historyRoutes: Routes = [
  {
    path: '',
    component: HistoryComponent
  }
];

@NgModule({
  declarations: [HistoryComponent,TruncatePipe,SafePipe],
  imports: [
    CommonModule,
    RouterModule.forChild(historyRoutes),
    MatToolbarModule
  ]
})
export class HistoryModule { }

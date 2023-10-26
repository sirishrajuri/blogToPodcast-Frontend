import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from 'src/safe.pipe';

@NgModule({
  declarations: [DashboardComponent,SafePipe],
  imports: [CommonModule, DashboardRoutingModule, MatToolbarModule,FormsModule,ReactiveFormsModule],
})
export class DashboardModule {}

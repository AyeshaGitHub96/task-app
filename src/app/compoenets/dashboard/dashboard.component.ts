import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ListTaskComponent } from '../list-task/list-task.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ListTaskComponent, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CreateTaskComponent } from "./compoenets/create-task/create-task.component";
import { TaskListComponent } from "./compoenets/list-task/list-task.component";
import {MatTabsModule} from '@angular/material/tabs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CreateTaskComponent, TaskListComponent, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'testapp';
}

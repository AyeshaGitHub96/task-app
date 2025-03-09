import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.scss',
})
export class ListTaskComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any = [];

  constructor(private taskService: TaskService) {
    this.taskService.getAllTask().subscribe({
      next: (tasks) => {
        this.dataSource = tasks;
      },
    });
  }
}

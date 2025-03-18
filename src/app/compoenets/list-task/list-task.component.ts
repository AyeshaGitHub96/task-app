import { Component, OnInit, signal, inject } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model'; 

import { Router } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, MatPaginatorModule, MatSelectModule, MatButtonModule, MatTableModule, MatFormFieldModule],
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class TaskListComponent implements OnInit {
  taskService = inject(TaskService);
  router = inject(Router);

  dataArray: Task[] = [];
  dataCount = signal(0);
  size = 5;
  page = 0;
  paginateOption = [5, 10, 25, 50];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.dataArray = tasks;
      this.dataCount.set(tasks.length);
    });
  }

  search(value: string): void {
    if (value) {
      this.dataArray = this.dataArray.filter(task => task.name.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.loadTasks();
    }
  }

  updateStatus(task: Task): void {
    this.taskService.updateTask({ ...task, status: task.status }).subscribe({
      next: () => console.log('Status updated!'),
      error: (err) => console.error(err)
    });
  }


  EditCustomer(task: Task): void {
    this.router.navigate(['/edit', task.id]);
    console.log('Navigating to edit:', task.id);
  }

  DeleteCustomer(task: Task): void {
    this.router.navigate(['/delete', task.id]);
    console.log('Navigating to delete:', task.id);
  }

  serverDataManager(event: any): void {
    this.size = event.pageSize;
    this.page = event.pageIndex;
  }
}

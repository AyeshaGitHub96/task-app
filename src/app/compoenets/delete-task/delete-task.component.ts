import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss'
})
export class DeleteTaskComponent implements OnInit {
  task!: Task;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTaskById(id).subscribe(task => {
        if (task) {
          this.task = task;
        }
      });
    }
  }

  confirmDelete(): void {
    if (this.task?.id) {
      this.taskService.deleteTask(this.task.id).subscribe(() => {
        this.router.navigate(['/task-list']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/task-list']);
  }
}
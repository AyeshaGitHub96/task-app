import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [NgIf, MatButtonModule],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss'
})
export class DeleteTaskComponent  {
  taskId: string | null = null;
  task: Task | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');

    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe(task => {
        this.task = task ?? null;
      });
    }
  }

  confirmDelete(): void {
    if (this.taskId) {
      this.taskService.deleteTask(this.taskId).subscribe(() => {
        this.router.navigate(['/tasks']); 
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']); 
  }
}
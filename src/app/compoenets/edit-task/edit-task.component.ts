import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskId: string;
  taskToUpdate: Task;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: [''],
      dueDate: [''],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get taskId from the route params
    this.taskId = this.route.snapshot.paramMap.get('id')!; // Ensure the ID exists

    // Fetch the task to be updated
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task: Task) => {
        this.taskToUpdate = task;
        this.taskForm.patchValue(task); // Populate form with task data
      },
      error: (err) => {
        console.error('Error fetching task:', err);
        alert('Failed to fetch task data');
      }
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const updatedTask: Task = { ...this.taskForm.value, id: this.taskId };

      this.taskService.updateTask(updatedTask).subscribe({
        next: (message) => {
          alert(message); // Success alert
          this.router.navigate(['/task-list']); // Navigate back to the task list
        },
        error: (error) => {
          alert(error); // Error alert
        }
      });
    }
  }
}
